Vue.component('filter-el', {
    data(){
        return {
            userSearch: ''
        }
    },
    methods: {
        filter(){
            let regexp = new RegExp(this.userSearch, 'i');
            this.$root.$refs.products.filtered = this.$root.$refs.products.products.filter(el => regexp.test(el.product_name));
        }
    },

    template: `
                <form action="#" class="search-form" @submit.prevent="filter">
                    <li class="search"><img class="filter-img" src="img/search.svg" alt="logo">
                        <input class="menu-search" type="text" v-model="userSearch">
                        <button class="btn-search" type="submit">
                            <i class="fas fa-search"></i>
                        </button>
                    </li>
                </form>
    `
});
