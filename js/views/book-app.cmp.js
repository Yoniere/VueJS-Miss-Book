import { bookService } from "../services/book-service.js";
import bookList from "../cmps/book-list.cmp.js";
// import bookDetails from './book-details.cmp.js';
import bookFilter from "../cmps/book-filter.cmp.js";

export default {
    template: `
        <section class='app-main'>
            <book-filter @filtered="setFilter"></book-filter>
            <!-- <book-details v-if="selectedBook" :book="selectedBook" @close="selectedBook=null"></book-details> -->
            <book-list v-else :books="booksToShow" @selected="selectBook"></book-list>
        </section>
    `,
    components: {
        bookList,
        // bookDetails,
        bookFilter,

    },
    data() {
        return {
            books: [],
            selectedBook: null,
            filterBy: {
                title: '',
                price: 200,
            },
        }
    },

    created() {
        bookService.query()
            .then(books => this.books = books)
    },

    methods: {
        selectBook(book) {
            return this.selectedBook = book;
        },
        setFilter(filterBy) {
            this.filterBy = filterBy
        }

    },
    computed: {
        booksToShow() {
            if (!this.filterBy.title && !this.filterBy.price) return this.books;
            const regex = new RegExp(this.filterBy.title, 'i');
            return this.books.filter(book => regex.test(book.title) && book.listPrice.amount < this.filterBy.price);
        },
    }
}