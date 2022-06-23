Vue.component('products', {
    data(){
        return {
            products: [],
            filtered: [],
        }
    },
    methods: {
    },
    mounted(){
        this.$parent.getJson('/api/products')
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
                console.log('data', data); 
                console.log('products', this.products);     
            });
        
    },  
    template: `
                <main class="content">
                    <div class="content-div container">    
                        <div class="product">
                            <product ref="refref" v-for="item of filtered" :key="item.id_product" :product="item"></product>
                        </div>
                    </div>
                </main>
    `       
});
Vue.component('product', {
    props: ['product'],
    template: `
                <div class="item">
                    <a :href="'product.html?productId=' + product.id_product" class="item-link">
                        <img class="item-pic" :src="product.img" alt="">
                        <div class="text-box">
                            <h3 class="text-h">{{product.product_name}}</h3>
                            <p class="text-desc">{{product.description}}</p>
                            <p class="text-price">{{product.price}}₽</p>
                            <div>
                            <button class="buy-btn" @click="$root.$refs.cart.addProduct(product, $event)">Купить</button>
                        </div>
                        </div>
                    </a>

                </div>
    `
});
