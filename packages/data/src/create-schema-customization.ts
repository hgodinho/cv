export const createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions;
    const typeDefs = `
        type Person implements Node {
            _context: String
            _id: String!
            id: String!
            type: String!
            name: String!

            birthDate: String
            description: String
            email: String
            familyName: [String]
            givenName: String
            hasCertification: [String]
            homeLocation: String
            honorificPrefix: String
        }
            
        type Place implements Node {
            _context: String
            _id: String!
            id: String!
            name: String!
            type: String!

            sameAs: [String]
            containsPlace: [String]
        }
            
        type Certification implements Node {
            _context: String
            _id: String!
            id: String!
            name: String!
            type: String!

            auditDate: String
            certificationIdentification: String
            certificationStatus: String
            issuedBy: String
            validFrom: String
            validIn: String
            about: String
            author: [String]
            additionalType: String
            award: String
            citation: String
            contributor: [String]
            copyrightHolder: [String]
            copyrightNotice: [String]
            copyrightYear: String
            dateCreated: String
            dateModified: String
            datePublished: String
            editor: [String]
            funder: [String]
            funding: [String]
            genre: [String]
            hasPart: [String]
            headline: String
            isAccessibleForFree: Boolean
            keywords: [String]
            license: String
            publication: [String]
            publisher: [String]
            recordedAt: String
            sameAs: [String]
        }

        type Article implements Node {
            _context: String
            _id: String!
            id: String!
            type: String!
            name: String!
            
            articleBody: String
            articleSection: String
            pageEnd: Int
            pageStart: Int
            pagination: String
            about: String
            author: [String]
            additionalType: String
            award: [String]
            citation: [String]
            contributor: [String]
            copyrightHolder: [String]
            copyrightNotice: [String]
            copyrightYear: String
            dateCreated: String 
            dateModified: String
            datePublished: String
            editor: [String]
            funder: [String]
            funding: [String]
            genre: [String]
            hasPart: [String]
            headline: String
            isAccessibleForFree: Boolean
            keywords: [String]
            license: String
            publication: [String]
            publisher: [String]
            recordedAt: String
            sameAs: [String]
        }

        type Event implements Node {
            _context: String
            _id: String!
            id: String!
            type: String!
            name: String!

            about: String
            contributor: [String]
            duration: String
            startDate: String
            endDate: String
            attendee: String
            attendees: [String]
            eventStatus: String
            location: String
            organizer: [String]
            sameAs: [String]
        }

        type CreativeWork implements Node {
            _context: String
            _id: String!
            id: String!
            type: String!
            name: String!

            about: String
            author: [String]
            additionalType: String
            award: [String]
            citation: [String]
            contributor: [String]
            copyrightHolder: [String]
            copyrightNotice: [String]
            copyrightYear: String
            dateCreated: String
            dateModified: String
            datePublished: String
            editor: [String]
            funder: [String]
            funding: [String]
            genre: [String]
            hasPart: [String]
            headline: String
            isAccessibleForFree: Boolean
            keywords: [String]
            license: String
            publication: [String]
            publisher: [String]
            recordedAt: String
            sameAs: [String]
        }

        type Chapter implements Node {
            _context: String
            _id: String!
            id: String!
            type: String!
            name: String!

            pageEnd: Int
            pageStart: Int
            pagination: String
            name: String
            about: String
            author: [String]
            additionalType: String
            award: [String]
            citation: [String]
            contributor: [String]
            copyrightHolder: [String]
            copyrightNotice: [String]
            copyrightYear: String
            dateCreated: String
            dateModified: String
            datePublished: String
            editor: [String]
            funder: [String]
            funding: [String]
            genre: [String]
            hasPart: [String]
            headline: String
            isAccessibleForFree: Boolean
            keywords: [String]
            license: String
            publication: [String]
            publisher: [String]
            recordedAt: String
            sameAs: [String]
        }

        type Role implements Node {
            _context: String
            _id: String!
            id: String!
            type: String!
            name: String!

            numberedPosition: Int
            startDate: String
            endDate: String
            additionalType: String
            alternateName: [String]
            member: String
            description: String
        }

        type Organization implements Node {
            _context: String
            _id: String!
            id: String!
            type: String!
            name: String!

            address: String
            award: [String]
            contactPoint: [String]
            location: String
            member: String
            members: [String]
            employee: String
            employees: [String]
            department: [String]
            event: String
            events: [String]
            sameAs: [String]
        }
    `;
    createTypes(typeDefs);
};
