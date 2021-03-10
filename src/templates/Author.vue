<template>
    <Layout>
        <template #main-content>
            <header>
                <div
                    class="flex flex-wrap items-center justify-center sm:justify-left border-t border-b border-gray-300 w-full mt-10 py-10 sm:px-16"
                >
                    <figure
                        class="px-2 mb-1 sm:mb-0 w-full sm:w-1/5 flex justify-center"
                    >
                        <g-image
                            :alt="author_detail.fullName"
                            :src="author_detail.avatar"
                            @error="imageLoadError"
                            class="h-14 w-14 rounded-full"
                            aria-labelledby="authorIcon"
                        />
                    </figure>
                    <div class="px-4 sm:w-4/5 text-center sm:text-left">
                        <h1
                            class="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 text-green-700"
                        >
                            {{ author_detail.fullName }}
                        </h1>
                        <p class="py-4 text-md text-gray-700 px-5">
                            {{ author_detail.biography }}
                        </p>
                    </div>
                </div>
            </header>
            <!--   <section>
                <post-card
                    :key="edge.node.id"
                    :post="edge.node"
                    v-for="edge in $page.author.belongsTo.edges"
                />
            </section>-->
        </template>
    </Layout>
</template>

<script>
 import UserService from '@/services/github/userService'
export default {
    name: 'Author',
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
    async created() {
        let service = new UserService()
        let user = this.$page.authors.title
        console.log('user : ' + user);
        this.author_detail = await service.getUserDetail(user);
    },
    methods: {
        imageLoadError(e) {
            e.target.src = `/authors/images/default.png`
        },
    },
}
</script>
<page-query>
query($path: String!) {
    authors(path: $path) {
        id
        title
        path
        name {
            firstName
            lastName
        }
    }
}
</page-query>
