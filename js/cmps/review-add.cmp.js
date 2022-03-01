import { bookService } from "../services/book-service.js";

export default {
    props: ['bookId'],

    template: `
        <form @submit.prevent class="review-add">
        <p class="review-title">Book Reviews:</p>
            <div v-if="book" v-for="review in showReviews" class="review">
                <span>Comment By: {{review.fullName}}</span>
                <span>Date: {{review.date}} Rate: {{review.rate}}</span>
                <span>Description: {{review.desc}}</span>
                <button @click="removeComment(review.id)">Delete Comment</button>
            </div>
            <div class="review">
            <p class="reviews-title">Your Review:</p>
            <input ref="input" type="text" @input="displayReview" v-model="review.fullName" placeholder="Your Name">
            <div class="review-data">
               Rate: <select @change="displayReview" v-model="review.rate" size=1></select>
                Date: <input v-model="review.date" type="date" id="start">
            </div>
            <textarea v-model="review.desc" id="review-content" name="review" rows="4" cols="30" placeholder="Your comment here"></textarea>
            <button @click="save">Submit</button>
</div>
        </form>
    `,
    data() {
        return {
            review: {
                name: '',
                rate: null,
                date: new Date().toISOString().slice(0, 10),
                desc: '',
            },
            book: null,
        }
    },
    created() {
        bookService.get(this.bookId).then(book => this.book = book)
    },
    computed: {
        showReviews() {
            if (Array.isArray(this.book.reviews)) return this.book.reviews
        }

    },
    mounted() {
        this.$refs.input.focus()

    },
    methods: {
        displayReview() {
            // console.log(this.review)
            return this.review
        },
        save() {
            bookService.addReview(this.bookId, {...this.review })
                .then(book => this.book = book)
                .then(this.review = {
                    fullName: 'Books Reader',
                    rate: null,
                    readAt: new Date().toISOString().slice(0, 10),
                    textArea: '',
                })
                .then(book => {
                    eventBus.emit('show-msg', { txt: 'Review Added', type: 'success' })
                    this.$router.push('/book')
                });


        },
        removeComment(reviewId) {
            console.log(reviewId)
            let currRevIdx = this.book.reviews.findIndex(review => review.id === reviewId)
            bookService.removeReview(this.book, reviewId)
                .then(book => console.log(book))
                .then(book => {
                    eventBus.emit('show-msg', { txt: 'Review Removed', type: 'failure' })
                })
            this.book.reviews.splice(currRevIdx, 1)

        }

    }
}