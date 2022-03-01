import bookPreview from './book-preview.cmp.js'

export default {
    props: ['books'],
    template: `
            <section class="book-list">
                <ul class="books">
                    <li v-for="book in books" :key="book.id">
                        <book-preview :book="book"></book-preview>
                        <button @click="select(book.id)">Details</button>
                    </li>
                </ul>

            </section>
    `,
    components: {
        bookPreview
    },
    data() {
        return {

        }
    },
    methods: {
        select(bookId) {
            this.$router.push(`/book/${bookId}`)
        }
    },
    computed: {

    }
}