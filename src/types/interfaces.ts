export interface ResumeEmployer {
    id: string;
    name: string;
    logo: {
        url: string;
    };
}

export interface ViewInitialInfo {
    createdAt: string;
    isViewed?: boolean;
    employer: ResumeEmployer;
}

export interface CompanyViewInfo {
    employer: ResumeEmployer;
    viewTimeArray: string[];
    isViewed?: boolean;
}

export interface ViewMockedInfo {
    date: {
        employerName: CompanyViewInfo;
    };
}
