export default {
    template: `
        <section class="book-filter">
            <label>
                Search
                <input @input="setFilter" v-model="filterBy.title" type="text" placeholder="name">
                <input @input="setFilter" v-model.number="filterBy.price" type="range" min="0" max="200" value="200">
            </label>        
    
    </section>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                price: null,
            }
        };
    },
    methods: {
        setFilter() {
            this.$emit('filtered', this.filterBy)
        }
    }
}