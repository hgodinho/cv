export const createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions;
    const typeDefs = `
        type Person implements Node {
            _context: String
            _id: String!
            id: String!
            type: String!
            name: String!
            path: String!
            locale: String!
            
            alternateName: [String]
            description: [String]
            identifier: String
            sameAs: [String]
            image: [String]
            subjectOf: [String]
            additionalType: [String]
            givenName: [String]
            familyName: [String]
            jobTitle: [String]
            email: [String]
            birthDate: String
            birthPlace: [String]
            honorificPrefix: [String]
            nationality: [String]
            homeLocation: [String]
            award: [String]
            brand: [String]
            hasCertification: [String]
            hasOccupation: [String]
            knowsAbout: [String]
            memberOf: [String]
            performerIn: [String]
            seeks: [String]
        }
            
        type Place implements Node {
            _context: String
            _id: String!
            id: String!
            name: String!
            path: String!
            locale: String!
            type: String!

            alternateName: [String]
            description: [String]
            identifier: [String]
            sameAs: [String]
            image: [String]
            subjectOf: [String]
            additionalType: [String]
            address: [String]
            containsPlace: [String]
            openingHours: [String]
        }
            
        type Credential implements Node {
            _context: String
            _id: String!
            id: String!
            name: String!
            path: String!
            locale: String!
            type: String!

            alternateName: [String]
            description: [String]
            identifier: [String]
            sameAs: [String]
            image: [String]
            subjectOf: [String]
            additionalType: [String]
            auditDate: String
            certificationIdentification: [String]
            certificationStatus: [String]
            issuedBy: [String]
            validFrom: [String]
            validIn: [String]
            about: [String]
            author: [String]
            abstract: [String]
            award: [String]
            citation: [String]
            contributor: [String]
            copyrightHolder: [String]
            copyrightNotice: [String]
            copyrightYear: [String]
            creativeWorkStatus: [String]
            dateCreated: String
            dateModified: String
            datePublished: String
            editor: [String]
            funder: [String]
            funding: [String]
            genre: [String]
            hasPart: [String]
            headline: [String]
            inLanguage: [String]
            isAccessibleForFree: Boolean
            keywords: [[String]]
            license: String
            publication: [String]
            publisher: [String]
            recordedAt: [String]
            articleBody: [String]
            articleSection: [String]
            pageEnd: [String]
            pageStart: [String]
            pagination: [String]
            availableLanguage: [String]
            educationalCredentialAwarded: [String]
            artEdition: [String]
            artMedium: [String]
            artform: [String]
            artworkSurface: [String]
            depth: [String]
            width: [String]
            height: [String]
            issn: [String]
            applicationCategory: [String]
            applicationSubCategory: [String]
            applicationSuite: [String]
        }

        type Intangible implements Node {
            _context: String
            _id: String!
            id: String!
            type: String!
            name: String!
            path: String!
            locale: String!
            
            alternateName: [String]
            description: [String]
            identifier: [String]
            sameAs: [String]
            image: [String]
            subjectOf: [String]
            additionalType: [String]
            numberedPosition: [String]
            startDate: String
            endDate: String
            roleName: [String]
            provider: [String]
            author: [String]
            qualifications: [String]
            responsibilities: [String]
            skills: [String]
            bestRating: [String]
            ratingValue: [String]
            worstRating: [String]
            ratingExplanation: [String]
            itemReviewed: [String]
        }

        type CreativeWork implements Node {
            _context: String
            _id: String!
            id: String!
            type: String!
            name: String!
            path: String!
            locale: String!

            alternateName: [String]
            description: [String]
            identifier: [String]
            sameAs: [String]
            image: [String]
            subjectOf: [String]
            additionalType: [String]
            about: [String]
            author: [String]
            abstract: [String]
            award: [String]
            citation: [String]
            contributor: [String]
            copyrightHolder: [String]
            copyrightNotice: [String]
            copyrightYear: [String]
            creativeWorkStatus: String
            dateCreated: String
            dateModified: String
            datePublished: String
            editor: [String]
            funder: [String]
            funding: [String]
            genre: [String]
            hasPart: [String]
            headline: [String]
            inLanguage: [String]
            isAccessibleForFree: Boolean
            keywords: [String]
            license: [String]
            publication: [String]
            publisher: [String]
            recordedAt: [String]
            articleBody: [String]
            articleSection: [String]
            pageEnd: [String]
            pageStart: [String]
            pagination: [String]
            availableLanguage: [String]
            educationalCredentialAwarded: [String]
            artEdition: [String]
            artMedium: [String]
            artform: [String]
            artworkSurface: [String]
            depth: [String]
            width: [String]
            height: [String]
            issn: [String]
            applicationCategory: [String]
            applicationSubCategory: [String]
            applicationSuite: [String]
        }

        type Event implements Node {
            _context: String
            _id: String!
            id: String!
            type: String!
            name: String!
            path: String!
            locale: String!

            alternateName: [String]
            description: [String]
            identifier: [String]
            sameAs: [String]
            image: [String]
            subjectOf: [String]
            additionalType: [String]
            about: [String]
            contributor: [String]
            duration: [String]
            startDate: String
            endDate: String
            attendee: [String]
            attendees: [String]
            eventStatus: String
            location: [String]
            organizer: [String]
            subEvent: [String]
            superEvent: [String]
        }

        type Organization implements Node {
            _context: String
            _id: String!
            id: String!
            type: String!
            name: String!
            path: String!
            locale: String!

            alternateName: [String]
            description: [String]
            identifier: [String]
            sameAs: [String]
            image: [String]
            subjectOf: [String]
            additionalType: [String]
            address: [String]
            alumni: [String]
            award: [String]
            contactPoint: [String]
            location: [String]
            department: [String]
            member: [String]
            members: [String]
            employee: [String]
            employees: [String]
            event: [String]
            events: [String]
            openingHours: [String]
        }
    `;
    createTypes(typeDefs);
};
