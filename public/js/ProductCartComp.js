Vue.component('cart-comp', {
    data(){
        return {
            product: {},
            productId: '',
        }
    },
    methods: {
    },
    mounted(){
        const params = new URLSearchParams(window.location.search);
        this.productId = params.get('productId');
        console.log(this.productId);
        this.$parent.getJson(`/api/product/${this.productId}`)
            .then(data => {
                this.product = data;
            });
    },  
    template: `
                <main class="content">
                    <div class="content-women">
                        <div class="content-block-bottom">
                            <form action="#">

                            </form>
                            <div class="product-header-woman-div">
                                <img class="product-header-woman" :src="product.img" alt="">
                            </div>
                            <form action="#">

                            </form>
                        </div>
                    </div>
                    <div class="content-women-collection container">
                        <div class="content-women-collection-block">

                            <div class="women-collection-border">
                                <h3 class="women-collection-h3">{{product.collection}}</h3>
                                <div class="strip"></div>
                                <h4 class="women-collection-h4">{{product.product_name}}</h4>
                                <p class="women-collection-p">{{product.description}}</p>
                                <p class="women-collection-price">{{product.price}}₽</p>
                            </div>

                            <div class="details-block">
                                <details>
                                    <summary>CHOOSE COLOR</summary>
                                </details>
                                <details>
                                    <summary>CHOOSE SIZE </summary>
                                </details>
                                <details>
                                    <summary>QUANTITY</summary>
                                </details>
                            </div>
                            <a href="#" class="button">
                                <div class="button-block">
                                    <p class="button-p" @click="$root.$refs.cart.addProduct(product, $event)"> Add to Cart</p>
                                </div>
                            </a>
                        </div>
                    </div>          
                </main>
    `       
});
