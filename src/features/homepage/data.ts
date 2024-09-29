import { FeaturedJob, TopCompany } from "./types";

export const featuredJobs: FeaturedJob[] = [
    {
        id: 1,
        title: "Senior Software Engineer",
        company: "Tech Innovators",
        location: "San Francisco, CA",
        salary: "$120,000 - $180,000",
    },
    {
        id: 2,
        title: "Marketing Manager",
        company: "Brand Builders",
        location: "New York, NY",
        salary: "$80,000 - $120,000",
    },
    {
        id: 3,
        title: "Data Scientist",
        company: "Data Insights Co.",
        location: "Seattle, WA",
        salary: "$100,000 - $150,000",
    },
];

export const topCompanies: TopCompany[] = [
    {
        id: 1,
        name: "Tech Innovators",
        logo: "/placeholder.svg?height=64&width=64",
        jobCount: 25,
    },
    {
        id: 2,
        name: "Brand Builders",
        logo: "/placeholder.svg?height=64&width=64",
        jobCount: 18,
    },
    {
        id: 3,
        name: "Data Insights Co.",
        logo: "/placeholder.svg?height=64&width=64",
        jobCount: 12,
    },
    {
        id: 4,
        name: "Global Solutions",
        logo: "/placeholder.svg?height=64&width=64",
        jobCount: 30,
    },
];