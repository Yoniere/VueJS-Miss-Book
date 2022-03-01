export default {
    props: ['book'],
    template: `
            <section class="book-preview">
                <p class="title">Title: {{book.title}}</p>
                <img :src="book.thumbnail" class="book-image">
                <p class="price">Price: {{setCurrency}}</p>
                
            </section>
    `,
    data() {
        return {

        }
    },
    methods: {},
    computed: {
        setCurrency() {
            return new Intl.NumberFormat('he-IL', { style: 'currency', currency: this.book.listPrice.currencyCode }).format(this.book.listPrice.amount);
        }
    }
}