// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
    siteName: 'Gridsome Blog Starter',
    siteDescription: 'A simple theme for Gridsome powered by Tailwind CSS v2',
    siteUrl: 'https://gridsome-blog-filip.netlify.app/',
    plugins: [
        {
            use: 'gridsome-plugin-tailwindcss',
        },
        {
            use: '@gridsome/vue-remark',
            options: {
                typeName: 'Documentation', // Required
                baseDir: './docs', // Where .md files are located
                pathPrefix: '/docs', // Add route prefix. Optional
                template: './src/templates/Documentation.vue', // Optional
                plugins: [
                    [
                        'gridsome-plugin-remark-shiki',
                        { theme: 'Material-Theme-Palenight', skipInline: true },
                    ],
                ],
            },
        },
        {
            use: '@gridsome/source-filesystem',
            options: {
                // path: 'posts/**/*.md',
                path: 'blog/**/*.md',
                typeName: 'Post',
                refs: {
                    tags: {
                        typeName: 'Tag',
                        create: true,
                    },
                },
                remark: {
                    plugins: [
                        // ...local plugins
                    ],
                },
            },
        },
        {
            use: `gridsome-plugin-netlify-cms`,
            options: {
                publicPath: `/admin`,
                modulePath: `src/admin/index.js`,
            },
        },

        {
            use: 'gridsome-plugin-rss',
            options: {
                contentTypeName: 'Post',
                feedOptions: {
                    title: 'Gridsome Starter Blog',
                    feed_url: 'https://gridsome-blog-filip.netlify.app/rss.xml',
                    site_url: 'https://gridsome-blog-filip.netlify.app/',
                },
                feedItemOptions: (node) => ({
                    title: node.title,
                    description: node.summary,
                    url: 'https://gridsome-blog-filip.netlify.app' + node.path,
                    author: 'Filip Vanden Eynde',
                    date: node.date,
                }),
                output: {
                    dir: './static',
                    name: 'rss.xml',
                },
            },
        },
        {
            use: '@gridsome/plugin-sitemap',
            options: {
                cacheTime: 600000, // default
            },
        },
    ],

    templates: {
        Tag: '/tag/:id',
        Post: '/blog/post/:title',
    },

    transformers: {
        remark: {
            externalLinksTarget: '_blank',
            externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
            anchorClassName: 'icon icon-link',
            plugins: [
                // ...global plugins
                [
                    'gridsome-plugin-remark-shiki',
                    { theme: 'Material-Theme-Palenight', skipInline: true },
                ],
            ],
        },
    },
}
