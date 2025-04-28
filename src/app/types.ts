export type SurveyContent = {
    examName: string,
    url: string, //URL of the JTA, so /ext/jta/survey/**url**
    pages: Page[]
};
export type Page = {
    title: string, //We don't need this
    url?: string, //Path to get to the particular page, we may not need this.
    pageNum: number, //This is used to track page components for addition or deletion
    content: Content[] 
};

export type Content = CertText | MultipleChoice | CertComment | JTA | KSAGroup | KSA;

export type CertText = {
    type: "info",
    id: string,
    html: string
};

export type MultipleChoice = {
    type: "MC"
    id: string,
    text: string,
    alternatives: Alternative[],
    hasComment: boolean,
    response?: string,
    comment?: string
};

export type Alternative = {
    id: number,
    text: string
}

export type CertComment = {
    type: "comment",
    id: string,
    text: string,
    response?: string
};

export type JTA = {
    type: "JTA",
    id: "JTA",
    ksaGroups: KSAGroup[]
};

export type KSAGroup = {
    type: "KSAGroup",
    id: string,
    text: string,
    comment: string,
    ksas: KSA[]
};

export type KSA = {
    type: "KSA"
    id: string,
    text: string,
    tis: TargetItem[]
};

export type TargetItem = {
    id: string,
    text: string,
    scores: JTAScores
};

export type JTAScores = {
    applicability: string,
    importance: string,
    difficulty: string,
    frequency: string
};