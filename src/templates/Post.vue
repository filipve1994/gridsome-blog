<template>
    <Layout>
        <div class="container-inner mx-auto my-16">
            <header class="title">
                <h1 class="text-4xl font-bold leading-tight">
                    {{ $page.post.title }}
                </h1>
                <div class="text-xl text-gray-600 mb-4">
                    Published on: {{ $page.post.date }}
                </div>
                <div class="text-xl text-gray-600 mb-4">
                    <p>
                        <i>{{ $page.post.timeToRead }} min to read</i>
                    </p>
                </div>
                <div class="flex mb-8 text-sm">
                    <g-link
                        :to="tag.path"
                        v-for="tag in $page.post.tags"
                        :key="tag.id"
                        class="bg-gray-300 rounded-full px-4 py-2 mr-4 hover:bg-green-300"
                    >
                        {{ tag.title }}
                    </g-link>
                </div>
            </header>

            <div class="markdown-body mb-8" v-html="$page.post.content" />

            <div class="mb-8">
                <g-link to="/blog" class="font-bold uppercase"
                    >Back to Blog
                </g-link>
            </div>

            <footer
                v-if="$page.post.author || $page.post.tags"
                class="flex flex-wrap pb-10 sm:pb-16"
            >
                <div>
                    <g-link
                        v-for="tag in $page.post.tags"
                        :key="tag.id"
                        :to="`${tag.path}/`"
                        class="inline-block text-green-700 hover:text-white hover:bg-green-700 border border-green-700 font-sans font-bold text-xs sm:text-sm px-4 py-2 mr-4 mb-2 rounded-full transition-color transition-bg"
                    >
                        <svg
                            class="inline w-3 fill-current align-middle mr-1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path
                                d="M0 10V2l2-2h8l10 10-10 10L0 10zm4.5-4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
                            />
                        </svg>
                        {{ tag.title }}
                    </g-link>
                </div>


            </footer>

            <author
                v-if="author_detail"
                :author="$page.post.author"
                :details="author_detail"
            />

        </div>
    </Layout>
</template>

<!--<page-query>-->
<!--query ($path: String) {-->
<!--post (path: $path) {-->
<!--title-->
<!--path-->
<!--content-->
<!--description-->
<!--timeToRead-->
<!--summary-->
<!--date (format: "D MMMM Y")-->
<!--author {-->
<!--id-->
<!--title-->
<!--path-->
<!--}-->
<!--tags {-->
<!--id-->
<!--title-->
<!--path-->
<!--}-->
<!--categories {-->
<!--id-->
<!--title-->
<!--path-->
<!--}-->
<!--keywords-->
<!--}-->
<!--}-->
<!--</page-query>-->

<page-query>
query Post($path: String!) {
    post: post(path: $path) {
        title
        date(format: "MMMM D, Y")
        content
        summary
        timeToRead
        author
        githubauthor

        cardImage {
            image(width: 400)
            alt
        }
        path
        tags {
            title
            path
        }
        categories {
            id
            title
            path
        }
        keywords
    }
}
</page-query>

<static-query>
query {
    metadata {
        siteUrl
    }
}
</static-query>

<script>
import Author from '../components/blog/Author'
import { slugify } from 'gridsome'
import UserService from '@/services/github/userService'

export default {
    name: 'Post',
    components: {
        Author,
        // Tags
    },
    data() {
        return {
            author_detail: {
                avatar: 'https://avatars.githubusercontent.com/u/47209284?v=4',
                //avatar: response.avatar_url,
                fullName: 'Filip Vanden Eynde',
                //fullName: response.name,
                biography: '',
                //biography: response.bio,
                profile_url: 'https://github.com/filipve1994',
                //profile_url: response.html_url,
                followers: 7,
                //followers: response.followers,
                repositories: 42,
                //repositories: response.public_repos,
                location: '',
                //location: response.location,
                blog_link: '',
                //blog_link: response.blog,
                twitter_username: '',
                //twitter_username: response.twitter_username,
            },
        }
    },
    metaInfo() {
        return {
            title: this.$page.post.title,
            meta: [
                {
                    key: 'og:type',
                    property: 'og:type',
                    content: 'article',
                },
                {
                    key: 'og:title',
                    property: 'og:title',
                    content: this.$page.post.title,
                },
                {
                    key: 'og:description',
                    property: 'og:description',
                    content: this.$page.post.summary,
                },
                {
                    key: 'description',
                    name: 'description',
                    content: this.$page.post.description,
                },
                {
                    key: 'keywords',
                    name: 'keywords',
                    content: this.keywords,
                },
                {
                    key: 'og:url',
                    property: 'og:url',
                    content: this.postUrl,
                },
                {
                    key: 'article:published_time',
                    property: 'article:published_time',
                    content: this.$page.post.date,
                },
                { property: 'og:image', content: this.cardImage },
                { property: 'og:image:secure_url', content: this.cardImage },

                { name: 'twitter:title', content: this.$page.post.title },
                { name: 'twitter:card', content: 'summary_large_image' },
                {
                    name: 'twitter:description',
                    content: this.$page.post.summary,
                },
                {
                    name: 'twitter:site',
                    content: 'https://twitter.com/vdefilip',
                },
                {
                    name: 'twitter:creator',
                    content: 'https://twitter.com/vdefilip',
                },
                { name: 'twitter:image', content: this.cardImage },
            ],
            script: [
                { src: 'https://platform.twitter.com/widgets.js', async: true },
            ],
        }
    },
    async created() {
        let service = new UserService()
        console.log('page post author: ' + this.$page.post.author)
        console.log('page post authorgithub: ' + this.$page.post.githubauthor)
        this.author_detail = await service.getUserDetail(this.$page.post.githubauthor)
    },
    computed: {
        postUrl() {
            let siteUrl = this.$static.metadata.siteUrl
            let postPath = this.$page.post.path

            return postPath
                ? `${siteUrl}${postPath}`
                : `${siteUrl}/${slugify(this.$page.post.title)}/`
        },
        keywords() {
            let keywords = ''
            for (let i in this.$page.post.keywords) {
                keywords = keywords.concat(`${this.$page.post.keywords[i]},`)
            }
            return keywords.replace(/(^\s*,)|(,\s*$)/g, '')
        },
        cardImage() {
            return `${this.$static.metadata.siteUrl}${this.$page.post.cardImage.image}`
        },
    },
}
</script>

<style scoped></style>

<style src="../css/github-markdown.css" />
