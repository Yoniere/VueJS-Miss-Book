export default {
    props: ['description'],
    template: `
    <section class="book-description">
    <p>description: {{showDescription}}</p>
    <button v-if="description.length>=100" @click="toggleMode">show {{btnTxt}}</button>
    </section>
    `,
    components: {

    },
    created() {
        console.log('desc', this.description);
    },
    data() {
        return {
            isMore: false,
        }
    },
    methods: {
        toggleMode() {
            this.isMore = !this.isMore
        }
    },
    computed: {
        btnTxt() {
            return this.isMore ? 'less' : 'More'
        },
        showDescription() {
            if (this.isMore || this.description.length < 100) return this.description;
            else return this.description.slice(0, 100) + '...'
        }
    },
}