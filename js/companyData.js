// Company Data Management Module
// Handles fetching and processing company data from Appwrite database

class CompanyDataManager {
    constructor() {
        this.companies = [];
        this.branches = [];
        this.workingDays = [];
        this.isLoading = false;
        this.lastFetchTime = null;
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutes cache
    }

    // Fetch all companies and their branches from database
    async fetchCompanyData() {
        if (this.isLoading) return this.companies;
        
        // Check cache
        if (this.lastFetchTime && (Date.now() - this.lastFetchTime < this.cacheTimeout)) {
            console.log('📦 Using cached company data');
            return this.companies;
        }

        this.isLoading = true;
        
        try {
            console.log('🔄 Fetching company data from database...');
            
            // Fetch companies, branches, and working days in parallel
            const [companiesResponse, branchesResponse, workingDaysResponse] = await Promise.all([
                this.fetchCompanies(),
                this.fetchBranches(),
                this.fetchWorkingDays()
            ]);

            this.companies = companiesResponse;
            this.branches = branchesResponse;
            this.workingDays = workingDaysResponse;
            this.lastFetchTime = Date.now();

            // Process and merge data
            const mergedData = this.mergeCompanyAndBranchData();
            
            console.log(`✅ Successfully loaded ${mergedData.length} companies with branches and working days`);
            return mergedData;

        } catch (error) {
            console.error('❌ Error fetching company data:', error);
            // Return fallback data if database fails
            return this.getFallbackData();
        } finally {
            this.isLoading = false;
        }
    }

    // Fetch companies from company_tb table
    async fetchCompanies() {
        try {
            // Check if Appwrite is available
            if (!window.databases || !window.appwriteConfig) {
                console.error('❌ Appwrite not available - checking if SDK loaded');
                console.log('window.databases:', window.databases);
                console.log('window.appwriteConfig:', window.appwriteConfig);
                console.log('window.Appwrite:', window.Appwrite);
                return [];
            }

            const response = await window.databases.listDocuments(
                window.appwriteConfig.DATABASE_ID,
                'company_tb',
                [
                    window.Query.orderDesc('$createdAt')
                ]
            );
            
            console.log(`📋 Found ${response.documents.length} companies`);
            return response.documents;
        } catch (error) {
            console.error('❌ Error fetching companies:', error);
            return [];
        }
    }

    // Fetch branches from branches table
    async fetchBranches() {
        try {
            // Check if Appwrite is available
            if (!window.databases || !window.appwriteConfig) {
                console.error('❌ Appwrite not available for branches - checking if SDK loaded');
                console.log('window.databases:', window.databases);
                console.log('window.appwriteConfig:', window.appwriteConfig);
                console.log('window.Appwrite:', window.Appwrite);
                return [];
            }

            const response = await window.databases.listDocuments(
                window.appwriteConfig.DATABASE_ID,
                'branches',
                [
                    window.Query.equal('is_active', true),
                    window.Query.equal('disabled', false),
                    window.Query.orderDesc('$createdAt')
                ]
            );
            
            console.log(`📍 Found ${response.documents.length} active branches`);
            return response.documents;
        } catch (error) {
            console.error('❌ Error fetching branches:', error);
            return [];
        }
    }

    // Fetch working days from working_days table
    async fetchWorkingDays() {
        try {
            // Check if Appwrite is available
            if (!window.databases || !window.appwriteConfig) {
                console.error('❌ Appwrite not available for working days - checking if SDK loaded');
                console.log('window.databases:', window.databases);
                console.log('window.appwriteConfig:', window.appwriteConfig);
                console.log('window.Appwrite:', window.Appwrite);
                return [];
            }

            const response = await window.databases.listDocuments(
                window.appwriteConfig.DATABASE_ID,
                window.appwriteConfig.WORKING_DAYS_TABLE,
                [
                    window.Query.orderAsc('day') // Order by day for consistency
                ]
            );
            
            console.log(`📅 Found ${response.documents.length} working days entries`);
            return response.documents;
        } catch (error) {
            console.error('❌ Error fetching working days:', error);
            return [];
        }
    }

    // Merge company and branch data
    mergeCompanyAndBranchData() {
        const mergedData = [];

        this.branches.forEach(branch => {
            // Find the corresponding company
            const company = this.companies.find(c => c.company_id === branch.company_id);
            
            if (company) {
                // Get working days for this branch
                const branchWorkingDays = this.workingDays.filter(wd => 
                    wd.branch_id === branch.branch_id || wd.company_id === branch.company_id
                );

                // Create merged company object with branch info
                const mergedCompany = {
                    id: branch.$id, // Use branch document ID as the main ID
                    branch_id: branch.branch_id,
                    company_id: branch.company_id,
                    name: company.name,
                    branch_name: branch.branch_name || company.name,
                    email: branch.email,
                    phone_number: branch.phone_number,
                    location: branch.location || 'Location not specified',
                    description: branch.description,
                    website: branch.website,
                    is_online: branch.is_online || false,
                    is_active: branch.is_active || false,
                    profile_image: branch.profile_image || '../public/images/main/ScheduleImage1.png',
                    header_image: branch.header_image,
                    branch_type: branch.branch_type,
                    coordinates: this.generateCoordinates(branch.location),
                    working_days: branchWorkingDays, // Add working days
                    // Additional fields for compatibility
                    time: this.generateTimeText(),
                    distance: null
                };
                
                mergedData.push(mergedCompany);
            }
        });

        return mergedData;
    }

    // Generate mock coordinates for location (in real app, use geocoding API)
    generateCoordinates(location) {
        const locationCoords = {
            'Accra, Ghana': { lat: 5.6037, lng: -0.1870 },
            'Tema, Ghana': { lat: 5.6699, lng: -0.0166 },
            'Kumasi, Ghana': { lat: 6.6885, lng: -1.6244 },
            'Takoradi, Ghana': { lat: 4.8845, lng: -1.7554 },
            'Cape Coast, Ghana': { lat: 5.1036, lng: -1.2466 },
            'Ho, Ghana': { lat: 6.6000, lng: 0.4700 }
        };
        
        return locationCoords[location] || { 
            lat: 5.6037 + (Math.random() - 0.5) * 2, 
            lng: -0.1870 + (Math.random() - 0.5) * 2 
        };
    }

    // Generate time text based on random distance
    generateTimeText() {
        const times = ['10 minutes away', '15 minutes away', '20 minutes away', '25 minutes away', '30 minutes away'];
        return times[Math.floor(Math.random() * times.length)];
    }

    // Get fallback data when database fails
    getFallbackData() {
        console.log('🔄 Using fallback company data');
        return [
            { 
                id: 'fallback1', 
                name: 'Voltic Water Company', 
                branch_name: 'Voltic Water Accra',
                location: 'Accra, Ghana', 
                time: '23 minutes away', 
                image: '../public/images/main/ScheduleImage1.png', 
                coordinates: { lat: 5.6037, lng: -0.1870 },
                is_online: true,
                is_active: true,
                working_days: [
                    { day: 'Monday', time: '8:00 AM - 6:00 PM' },
                    { day: 'Tuesday', time: '8:00 AM - 6:00 PM' },
                    { day: 'Wednesday', time: '8:00 AM - 6:00 PM' },
                    { day: 'Thursday', time: '8:00 AM - 6:00 PM' },
                    { day: 'Friday', time: '8:00 AM - 6:00 PM' },
                    { day: 'Saturday', time: '9:00 AM - 4:00 PM' },
                    { day: 'Sunday', time: 'Closed' }
                ]
            },
            { 
                id: 'fallback2', 
                name: 'Bel-Aqua Ghana', 
                branch_name: 'Bel-Aqua Tema',
                location: 'Tema, Ghana', 
                time: '15 minutes away', 
                image: '../public/images/main/ScheduleImage1.png', 
                coordinates: { lat: 5.6699, lng: -0.0166 },
                is_online: true,
                is_active: true,
                working_days: [
                    { day: 'Monday', time: '7:00 AM - 7:00 PM' },
                    { day: 'Tuesday', time: '7:00 AM - 7:00 PM' },
                    { day: 'Wednesday', time: '7:00 AM - 7:00 PM' },
                    { day: 'Thursday', time: '7:00 AM - 7:00 PM' },
                    { day: 'Friday', time: '7:00 AM - 7:00 PM' },
                    { day: 'Saturday', time: '8:00 AM - 5:00 PM' },
                    { day: 'Sunday', time: 'Closed' }
                ]
            },
            { 
                id: 'fallback3', 
                name: 'Special Ice Water', 
                branch_name: 'Special Ice Kumasi',
                location: 'Kumasi, Ghana', 
                time: '45 minutes away', 
                image: '../public/images/main/ScheduleImage1.png', 
                coordinates: { lat: 6.6885, lng: -1.6244 },
                is_online: true,
                is_active: true,
                working_days: [
                    { day: 'Monday', time: '9:00 AM - 5:00 PM' },
                    { day: 'Tuesday', time: '9:00 AM - 5:00 PM' },
                    { day: 'Wednesday', time: '9:00 AM - 5:00 PM' },
                    { day: 'Thursday', time: '9:00 AM - 5:00 PM' },
                    { day: 'Friday', time: '9:00 AM - 5:00 PM' },
                    { day: 'Saturday', time: '10:00 AM - 3:00 PM' },
                    { day: 'Sunday', time: 'Closed' }
                ]
            }
        ];
    }

    // Refresh company data
    async refreshCompanyData() {
        this.lastFetchTime = null; // Invalidate cache
        return await this.fetchCompanyData();
    }

    // Get company by ID
    getCompanyById(companyId) {
        return this.companies.find(c => c.$id === companyId);
    }

    // Get branch by ID
    getBranchById(branchId) {
        return this.branches.find(b => b.$id === branchId);
    }

    // Search companies
    searchCompanies(query) {
        const searchTerm = query.toLowerCase();
        return this.companies.filter(company => 
            company.name.toLowerCase().includes(searchTerm) ||
            company.email.toLowerCase().includes(searchTerm)
        );
    }

    // Get online companies only
    getOnlineCompanies() {
        return this.mergeCompanyAndBranchData().filter(company => company.is_online);
    }

    // Get active companies only
    getActiveCompanies() {
        return this.mergeCompanyAndBranchData().filter(company => company.is_active);
    }

    // Get working days for a specific branch
    getWorkingDaysForBranch(branchId) {
        return this.workingDays.filter(wd => 
            wd.branch_id === branchId || wd.company_id === branchId
        );
    }

    // Get working days for a specific company
    getWorkingDaysForCompany(companyId) {
        return this.workingDays.filter(wd => wd.company_id === companyId);
    }
}

// Create global instance
window.companyDataManager = new CompanyDataManager();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CompanyDataManager;
}
