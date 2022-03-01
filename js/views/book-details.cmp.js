import bookDescription from "../cmps/book-description.cmp.js"
import { bookService } from "../services/book-service.js";
import reviewAdd from "../cmps/review-add.cmp.js";

export default {
    // props: ['book'],
    template: `
    <section v-if="book" class="book-details">
    <p>Title: {{book.title}}</p>
    <p>subtitle: {{book.subtitle}}</p>
    <p>authors: {{book.authors}}</p>
    <p>published Date: {{publishedDateTxt}}</p>
    <book-description :description="book.description"></book-description>
    <p>pageCount: {{pageCountTxt}}</p>
    <p>language: {{book.language}}</p>
    <p >listPrice: <span :class="priceColorTxt">{{book.listPrice.amount}}</span></p>
    <p v-if="book.listPrice.isOnSale">listPrice: SALE!!!!!</p>
    <!-- <button @click="$emit('close')">X</button> -->
    <review-add :bookId="book.id"></review-add>
    <router-link to="/book">Back To books</router-link>
    </section>
    <section v-else></section>

    `,
    components: {
        bookDescription,
        reviewAdd,

    },
    data() {
        return {
            book: null,
        }
    },
    created() {
        const id = this.$route.params.bookId;
        console.log(id)
        bookService.get(id)
            .then(book => this.book = book)
    },
    methods: {

    },
    computed: {
        pageCountTxt() {
            if (this.book.pageCount > 500) {
                return `${this.book.pageCount} - Long reading`
            } else if (this.book.pageCount > 200) {
                return `${this.book.pageCount} - Decent reading`
            } else {
                return `${this.book.pageCount} - Light reading`
            }

        },
        publishedDateTxt() {
            return (new Date().getFullYear() - this.book.publishedDate > 10) ? `${this.book.publishedDate}-Vetern Book` : `${this.book.publishedDate}-New!`
        },
        priceColorTxt() {
            return { expensive: this.book.listPrice.amount > 150, cheap: this.book.listPrice.amount < 20 };
        }
    }
}