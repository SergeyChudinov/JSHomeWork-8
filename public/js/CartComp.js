Vue.component('cart', {
    data(){
      return {
          cartItems: [],
          showCart: false,
      }
    },
    methods: {
        addProduct(product, $event){
            $event.preventDefault();
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            console.log('find', find); 
            if(find){
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1});
                find.quantity++;
            } else {
                let prod = Object.assign({quantity: 1}, product);
                this.$parent.postJson('/api/cart', prod)
                    .then(data => {
                        if (data.result === 1) {
                          this.cartItems.push(prod);
                       }
                    });
            }
        },
        remove(item) {
            this.$parent.deleteJson(`/api/cart/${item.id_product}`);
            this.cartItems.splice(this.cartItems.indexOf(item), 1)
            
        },
        totalSum () {  // get 
            return this.cartItems.reduce((acc, item) => acc + +item.price * item.quantity, 0)
        },
        clearBasket(){
            this.cartItems = [];
            this.$parent.deleteJson(`/api/cart`);
        },
    },
    mounted(){
        this.$parent.getJson('/api/cart')
            .then(data => {
                for(let el of data.contents){
                    this.cartItems.push(el);
                }
            });
    },
    template: `
        <div>
            <li class="basket"><a href="#"><img src="img/basket.svg" alt="logo" @click="showCart = !showCart"></a></li>
            <div class="cart-block" v-show="showCart">
                <p v-if="!cartItems.length">Корзина пуста</p>
                <cart-item class="cart-item" 
                v-for="item of cartItems" 
                :key="item.id_product"
                :cartItem="item" 
                @remove="remove">
                </cart-item>
                <div class="basketTotal" v-if="cartItems.length">
                    Товаров в корзине на сумму:
                    <span class="basketTotalValue">{{ totalSum() }}₽</span>
                </div>
                <a class="goToBascet" v-if="cartItems.length" href="cart.html">Перейти в корзину</a>
            </div>
            
        </div>`
});

Vue.component('cart-item', {
    props: ['cartItem'],
    template: `
                <div class="cart-item">
                    <div class="product-bio">
                        <img class="cartItem-img" :src="cartItem.img" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">{{cartItem.product_name}}</p>
                            <p class="product-quantity">Количество: {{cartItem.quantity}}</p>
                            <p class="product-single-price">{{cartItem.price}}₽ за единицу</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">{{cartItem.quantity*cartItem.price}}₽</p>
                        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                    </div>
                    
                </div>               
    `
});
