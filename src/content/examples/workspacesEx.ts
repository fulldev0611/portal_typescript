export const workspacesExample = {
    name: 'Java Microservice Workspace',
    uuid: 'c8fcf64a-8960-11ea-bc55-0242ac130003',
    version: '1.0.0',
    user_role: {
        name: 'Java Microservice Developer',
        uuid: 'dd29e0a4-8962-11ea-bc55-0242ac130003',
    },
    application_type: {
        name: 'Microservices',
        uuid: 'ec5089f6-8963-11ea-bc55-0242ac130003',
    },
    runtime: {
        name: 'Java Runtime Environment',
        version: 1.8,
    },
    toolset: [
        {
            toolset: 'SpringBoot',
            version: '2.2.6',
        },
    ],
    dependencies: [
        {
            dependency: 'AWS Kubernetes',
            type: 'Kubernetes Cluster',
            version: 1.14,
            used: '<yes|no>',
            mandatory: 'yes',
            properties: null,
        },
        {
            dependency: 'AWS Nexus Repository Manager',
            type: 'Artifact Repository',
            version: 1.1,
            used: '<yes|no>',
            mandatory: 'yes',
            properties: null,
        },
        {
            dependency: 'AWS Jenkins',
            type: 'CI Server',
            version: 1.1,
            used: '<yes|no>',
            mandatory: 'yes',
            properties: null,
        },
        {
            dependency: 'AWS GitLab',
            type: 'CI Server',
            version: 1.1,
            used: '<yes|no>',
            mandatory: 'yes',
            properties: null,
        },
        {
            dependency: 'AWS MySQL Database',
            type: 'Relational Database',
            version: 1.1,
            used: '<yes|no>',
            mandatory: 'no',
            properties: null,
        },
        {
            dependency: 'AWS Postgres Database',
            type: 'Relational Database',
            version: 1.1,
            used: '<yes|no>',
            mandatory: 'no',
            properties: null,
        },
    ],
};
