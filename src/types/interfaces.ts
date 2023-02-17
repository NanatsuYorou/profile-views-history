export interface ResumeEmployer {
    id: string;
    name: string;
    logo: {
        url: string;
    };
}

export interface ViewInitialInfo {
    createdAt: string;
    viewed?: boolean;
    employer: ResumeEmployer;
}
export interface ViewInfo {
    employer: ResumeEmployer;
    viewTime: string[];
    viewed?: boolean;
}

export interface ViewMockedInfo {
    date: {
        employerName: ViewInfo;
    };
}
