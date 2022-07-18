Vue.component('basket', {
    data(){
      return {
      }
    },
    methods: {
        remove(item) {
            this.$root.$refs.cart.remove(item);
            
        },          
    },
    
    template: `
                <main class="content">
                    <div class="content-arrivals">
                        <div class="content-arrivals-block container">
                            <h3 class="new-arrivls">SHOPPING CART</h3>
                        </div>
                    </div>
                    <div class="content-cart container">
                        <div class="content-cart-left">
                            <bascet-item  v-for="item of $root.$refs.cart.cartItems" :key="item.id_product" :product="item" @remove="remove">
                            </bascet-item>
                            <div class="content-cart-left-block-button">
                                <div class="content-cart-left-block-button-left" v-if="$root.$refs.cart.cartItems.length">
                                    <button class="cart-button-submit" type="submit" @click="$root.$refs.cart.clearBasket()"> 
                                    CLEAR SHOPPING CART
                                    </button>
                                </div>
                                <div class="content-cart-left-block-button-right" >
                                    <a href="index.html" class="cart-button-submit">CONTINUE SHOPPING</a>
                                </div>
                            </div>
                            <p class="bascet-empty" v-if="!$root.$refs.cart.cartItems.length">Корзина пуста</p>
                        </div>
                        
                        <div class="content-cart-right">      
                            <form class="shopping-adress" action="#">
                                <h3 class="content-cart-right-h3">SHIPPING ADRESS</h3>
                                <input class="cart-text" type="text" placeholder="Bangladesh"><br>
                                <input class="cart-text" type="text" placeholder="State"><br>
                                <input class="cart-text" type="text" placeholder="Postcode / Zip"><br>
                                <div class="cart-button-block">
                                    <button class="cart-button-submit" type="submit">GET A QUOTE</button>
                                </div>
                            </form>
                            <div class="content-cart-right-block">
                                <div class="content-cart-right-block-top">
                                    <p class="content-cart-right-block-top-p1">SUB TOTAL:<span
                                class="content-cart-right-block-top-p-black">{{ $root.$refs.cart.totalSum() }}₽</span></p>
                                    <p class="content-cart-right-block-top-p2">GRAND TOTAL:<span
                                class="content-cart-right-block-top-p-red">{{ $root.$refs.cart.totalSum() }}₽</span></p>
                                </div>
                                <div class="content-cart-right-block-bottom">
                                    <button class="cart-button-submit-4" type="submit">PROCEED TO CHECKOUT</button>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                   
                </main>    
     `
});

Vue.component('bascet-item', {
    props: ['product'],
    template: `
    <a :href="'product.html?productId=' + product.id_product" class="content-cart-left-block">
        <img class="cart-img" :src="product.img" alt="foto">
        <div class="cart-img-block">
            <div class="cart-img-text">
                <h3 class="content-cart-h3">{{product.product_name}}</h3>
                <p class="content-cart-p">Цена:<span class="content-cart-p-red">{{product.price}}₽</span></p>
                <p class="content-cart-p">Color:<span class="content-cart-p-grey">Red</span></p>
                <p class="content-cart-p">Size:<span class="content-cart-p-grey">Xl</span></p>
                <p class="bascet-quantity">Количество: {{product.quantity}}</p>
                <p class="bascet-price">Сумма: {{product.quantity*product.price}}₽</p>
            </div>
            <a class="cross-a" href="#">
                <div class="cross">
                    <i class="fa-solid fa-xmark" @click="$emit('remove', product)"></i>
                </div>
            </a>
        </div>
    </a>                
    `
});
