## Modules

<dl>
<dt><a href="#module_Cestino/BasicCartService">Cestino/BasicCartService</a></dt>
<dd><p>Fetch masterdata from an external resource and put it to the cart model.</p>
</dd>
<dt><a href="#module_Cestino">Cestino</a></dt>
<dd><p>A basic shopping cart implementation in javascript.</p>
</dd>
<dt><a href="#module_Cestino/PriceFormatter">Cestino/PriceFormatter</a></dt>
<dd><p>Formatting integers to decimal currency representation.</p>
</dd>
<dt><a href="#module_Cestino/Util">Cestino/Util</a></dt>
<dd><p>Utilities used to check and modify basic data types.</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#BasicCartService">BasicCartService</a> ℗</dt>
<dd></dd>
<dt><a href="#Cart">Cart</a> ℗</dt>
<dd></dd>
<dt><a href="#CartPosition">CartPosition</a> ℗</dt>
<dd></dd>
<dt><a href="#Product">Product</a> ℗</dt>
<dd></dd>
<dt><a href="#ProductQuantity">ProductQuantity</a> ℗</dt>
<dd></dd>
<dt><a href="#ProductFeature">ProductFeature</a> ℗</dt>
<dd></dd>
<dt><a href="#ShippingGroup">ShippingGroup</a> ℗</dt>
<dd></dd>
<dt><a href="#PriceFormatter">PriceFormatter</a> ℗</dt>
<dd></dd>
</dl>

<a name="module_Cestino/BasicCartService"></a>

## Cestino/BasicCartService
Fetch masterdata from an external resource and put it to the cart model.

**Requires**: <code>module:bluebird</code>, <code>module:atomicjs</code>  

* * *

<a name="module_Cestino/BasicCartService.create"></a>

### Cestino/BasicCartService.create(options) ⇒ [<code>BasicCartService</code>](#BasicCartService)
Creates an object to load masterdata from a server.

**Kind**: static method of [<code>Cestino/BasicCartService</code>](#module_Cestino/BasicCartService)  

| Param | Type |
| --- | --- |
| options | <code>Object</code> | 


* * *

<a name="module_Cestino"></a>

## Cestino
A basic shopping cart implementation in javascript.

**Requires**: [<code>Cestino/BasicCartService</code>](#module_Cestino/BasicCartService), [<code>Cestino/PriceFormatter</code>](#module_Cestino/PriceFormatter), [<code>Cestino/Util</code>](#module_Cestino/Util)  

* [Cestino](#module_Cestino)
    * _static_
        * [.Util](#module_Cestino.Util)
        * [.PriceFormatter](#module_Cestino.PriceFormatter)
        * [.BasicCartService](#module_Cestino.BasicCartService)
        * [.Product](#module_Cestino.Product)
            * [.create](#module_Cestino.Product.create) ⇒ [<code>Product</code>](#Product)
            * [.extendWith](#module_Cestino.Product.extendWith) ⇒ [<code>Product</code>](#Product)
        * [.ProductFeature](#module_Cestino.ProductFeature)
            * [.create](#module_Cestino.ProductFeature.create) ⇒ [<code>ProductFeature</code>](#ProductFeature)
            * [.extendWith](#module_Cestino.ProductFeature.extendWith) ⇒ [<code>ProductFeature</code>](#ProductFeature)
        * [.ProductQuantity](#module_Cestino.ProductQuantity)
            * [.create](#module_Cestino.ProductQuantity.create) ⇒ [<code>ProductQuantity</code>](#ProductQuantity)
            * [.extendWith](#module_Cestino.ProductQuantity.extendWith) ⇒ [<code>ProductQuantity</code>](#ProductQuantity)
        * [.ShippingGroup](#module_Cestino.ShippingGroup)
            * [.create](#module_Cestino.ShippingGroup.create) ⇒ [<code>ShippingGroup</code>](#ShippingGroup)
            * [.extendWith](#module_Cestino.ShippingGroup.extendWith) ⇒ [<code>ShippingGroup</code>](#ShippingGroup)
        * [.create(oService)](#module_Cestino.create) ⇒ [<code>Cart</code>](#Cart)
        * ~~[.createProduct()](#module_Cestino.createProduct)~~
        * ~~[.createProductFeature()](#module_Cestino.createProductFeature)~~
        * ~~[.createProductQuantity()](#module_Cestino.createProductQuantity)~~
        * ~~[.extendProduct()](#module_Cestino.extendProduct)~~
        * ~~[.extendProductFeature()](#module_Cestino.extendProductFeature)~~
        * ~~[.extendProductQuantity()](#module_Cestino.extendProductQuantity)~~
    * _inner_
        * ["add" (position)](#module_Cestino..event_add)
        * ["remove" (position)](#module_Cestino..event_remove)
        * ["change" (position)](#module_Cestino..event_change)
        * ["load" (cart)](#module_Cestino..event_load)
        * *[~loadCallback](#module_Cestino..loadCallback) : <code>function</code>*
        * *[~addProductCallback](#module_Cestino..addProductCallback) : <code>function</code>*
        * *[~removeProductCallback](#module_Cestino..removeProductCallback) : <code>function</code>*
        * *[~changePositionCallback](#module_Cestino..changePositionCallback) : <code>function</code>*


* * *

<a name="module_Cestino.Util"></a>

### Cestino.Util
**Kind**: static property of [<code>Cestino</code>](#module_Cestino)  
**See**: [Cestino/Util](#module_Cestino/Util)  

* * *

<a name="module_Cestino.PriceFormatter"></a>

### Cestino.PriceFormatter
**Kind**: static property of [<code>Cestino</code>](#module_Cestino)  
**See**: [Cestino/PriceFormatter](#module_Cestino/PriceFormatter)  

* * *

<a name="module_Cestino.BasicCartService"></a>

### Cestino.BasicCartService
**Kind**: static property of [<code>Cestino</code>](#module_Cestino)  
**See**: [Cestino/BasicCartService](#module_Cestino/BasicCartService)  

* * *

<a name="module_Cestino.Product"></a>

### Cestino.Product
**Kind**: static property of [<code>Cestino</code>](#module_Cestino)  

* [.Product](#module_Cestino.Product)
    * [.create](#module_Cestino.Product.create) ⇒ [<code>Product</code>](#Product)
    * [.extendWith](#module_Cestino.Product.extendWith) ⇒ [<code>Product</code>](#Product)


* * *

<a name="module_Cestino.Product.create"></a>

#### Product.create ⇒ [<code>Product</code>](#Product)
Creates an object of type Cart.Product

**Kind**: static property of [<code>Product</code>](#module_Cestino.Product)  

| Param | Type |
| --- | --- |
| id | <code>String</code> | 
| title | <code>String</code> | 
| price | <code>Integer</code> | 


* * *

<a name="module_Cestino.Product.extendWith"></a>

#### Product.extendWith ⇒ [<code>Product</code>](#Product)
Extends class Product by passed constructor

**Kind**: static property of [<code>Product</code>](#module_Cestino.Product)  

| Param | Type |
| --- | --- |
| subclassConstructor | <code>\*</code> | 


* * *

<a name="module_Cestino.ProductFeature"></a>

### Cestino.ProductFeature
**Kind**: static property of [<code>Cestino</code>](#module_Cestino)  

* [.ProductFeature](#module_Cestino.ProductFeature)
    * [.create](#module_Cestino.ProductFeature.create) ⇒ [<code>ProductFeature</code>](#ProductFeature)
    * [.extendWith](#module_Cestino.ProductFeature.extendWith) ⇒ [<code>ProductFeature</code>](#ProductFeature)


* * *

<a name="module_Cestino.ProductFeature.create"></a>

#### ProductFeature.create ⇒ [<code>ProductFeature</code>](#ProductFeature)
Creates an object of type Cart.ProductFeature

**Kind**: static property of [<code>ProductFeature</code>](#module_Cestino.ProductFeature)  

| Param | Type |
| --- | --- |
| id | <code>String</code> \| <code>Integer</code> | 
| label | <code>String</code> | 
| price | <code>Integer</code> | 


* * *

<a name="module_Cestino.ProductFeature.extendWith"></a>

#### ProductFeature.extendWith ⇒ [<code>ProductFeature</code>](#ProductFeature)
Extends class ProductFeature by passed constructor

**Kind**: static property of [<code>ProductFeature</code>](#module_Cestino.ProductFeature)  

| Param | Type |
| --- | --- |
| subclassConstructor | <code>\*</code> | 


* * *

<a name="module_Cestino.ProductQuantity"></a>

### Cestino.ProductQuantity
**Kind**: static property of [<code>Cestino</code>](#module_Cestino)  

* [.ProductQuantity](#module_Cestino.ProductQuantity)
    * [.create](#module_Cestino.ProductQuantity.create) ⇒ [<code>ProductQuantity</code>](#ProductQuantity)
    * [.extendWith](#module_Cestino.ProductQuantity.extendWith) ⇒ [<code>ProductQuantity</code>](#ProductQuantity)


* * *

<a name="module_Cestino.ProductQuantity.create"></a>

#### ProductQuantity.create ⇒ [<code>ProductQuantity</code>](#ProductQuantity)
Creates an object of type Cart.ProductQuantity

**Kind**: static property of [<code>ProductQuantity</code>](#module_Cestino.ProductQuantity)  

| Param | Type |
| --- | --- |
| amount | <code>Integer</code> | 
| dimX | <code>Integer</code> | 
| dimY | <code>Integer</code> | 
| dimZ | <code>Integer</code> | 


* * *

<a name="module_Cestino.ProductQuantity.extendWith"></a>

#### ProductQuantity.extendWith ⇒ [<code>ProductQuantity</code>](#ProductQuantity)
Extends class ProductQuantity by passed constructor

**Kind**: static property of [<code>ProductQuantity</code>](#module_Cestino.ProductQuantity)  

| Param | Type |
| --- | --- |
| subclassConstructor | <code>\*</code> | 


* * *

<a name="module_Cestino.ShippingGroup"></a>

### Cestino.ShippingGroup
**Kind**: static property of [<code>Cestino</code>](#module_Cestino)  

* [.ShippingGroup](#module_Cestino.ShippingGroup)
    * [.create](#module_Cestino.ShippingGroup.create) ⇒ [<code>ShippingGroup</code>](#ShippingGroup)
    * [.extendWith](#module_Cestino.ShippingGroup.extendWith) ⇒ [<code>ShippingGroup</code>](#ShippingGroup)


* * *

<a name="module_Cestino.ShippingGroup.create"></a>

#### ShippingGroup.create ⇒ [<code>ShippingGroup</code>](#ShippingGroup)
Creates an object of type Cart.ShippingGroup

**Kind**: static property of [<code>ShippingGroup</code>](#module_Cestino.ShippingGroup)  

| Param | Type |
| --- | --- |
| name | <code>String</code> | 


* * *

<a name="module_Cestino.ShippingGroup.extendWith"></a>

#### ShippingGroup.extendWith ⇒ [<code>ShippingGroup</code>](#ShippingGroup)
Extends class ShippingGroup by passed constructor

**Kind**: static property of [<code>ShippingGroup</code>](#module_Cestino.ShippingGroup)  

| Param | Type |
| --- | --- |
| subclassConstructor | <code>\*</code> | 


* * *

<a name="module_Cestino.create"></a>

### Cestino.create(oService) ⇒ [<code>Cart</code>](#Cart)
Creates an object of type Cart; The main object.

**Kind**: static method of [<code>Cestino</code>](#module_Cestino)  

| Param | Type |
| --- | --- |
| oService | <code>Object</code> | 


* * *

<a name="module_Cestino.createProduct"></a>

### ~~Cestino.createProduct()~~
***Deprecated***

**Kind**: static method of [<code>Cestino</code>](#module_Cestino)  

* * *

<a name="module_Cestino.createProductFeature"></a>

### ~~Cestino.createProductFeature()~~
***Deprecated***

**Kind**: static method of [<code>Cestino</code>](#module_Cestino)  

* * *

<a name="module_Cestino.createProductQuantity"></a>

### ~~Cestino.createProductQuantity()~~
***Deprecated***

**Kind**: static method of [<code>Cestino</code>](#module_Cestino)  

* * *

<a name="module_Cestino.extendProduct"></a>

### ~~Cestino.extendProduct()~~
***Deprecated***

**Kind**: static method of [<code>Cestino</code>](#module_Cestino)  

* * *

<a name="module_Cestino.extendProductFeature"></a>

### ~~Cestino.extendProductFeature()~~
***Deprecated***

**Kind**: static method of [<code>Cestino</code>](#module_Cestino)  

* * *

<a name="module_Cestino.extendProductQuantity"></a>

### ~~Cestino.extendProductQuantity()~~
***Deprecated***

**Kind**: static method of [<code>Cestino</code>](#module_Cestino)  

* * *

<a name="module_Cestino..event_add"></a>

### "add" (position)
Event reporting that a product has been add to cart.

**Kind**: event emitted by [<code>Cestino</code>](#module_Cestino)  

| Param | Type |
| --- | --- |
| position | [<code>CartPosition</code>](#CartPosition) | 


* * *

<a name="module_Cestino..event_remove"></a>

### "remove" (position)
Event reporting that a product has been removed from cart.

**Kind**: event emitted by [<code>Cestino</code>](#module_Cestino)  

| Param | Type |
| --- | --- |
| position | [<code>CartPosition</code>](#CartPosition) | 


* * *

<a name="module_Cestino..event_change"></a>

### "change" (position)
Event reporting that a product-position in cart has been changed.

**Kind**: event emitted by [<code>Cestino</code>](#module_Cestino)  

| Param | Type |
| --- | --- |
| position | [<code>CartPosition</code>](#CartPosition) | 


* * *

<a name="module_Cestino..event_load"></a>

### "load" (cart)
Event reporting that the cart has been load from json.

**Kind**: event emitted by [<code>Cestino</code>](#module_Cestino)  

| Param | Type |
| --- | --- |
| cart | [<code>Cart</code>](#Cart) | 


* * *

<a name="module_Cestino..loadCallback"></a>

### *Cestino~loadCallback : <code>function</code>*
Callback that will be fired, if registered and the cart has been load from json.

**Kind**: inner abstract typedef of [<code>Cestino</code>](#module_Cestino)  

| Param | Type |
| --- | --- |
| cart | [<code>Cart</code>](#Cart) | 


* * *

<a name="module_Cestino..addProductCallback"></a>

### *Cestino~addProductCallback : <code>function</code>*
Callback that will be fired, if registered and a product has been add to cart.

**Kind**: inner abstract typedef of [<code>Cestino</code>](#module_Cestino)  

| Param | Type |
| --- | --- |
| position | [<code>CartPosition</code>](#CartPosition) | 


* * *

<a name="module_Cestino..removeProductCallback"></a>

### *Cestino~removeProductCallback : <code>function</code>*
Callback that will be fired, if registered and a product has been removed from cart.

**Kind**: inner abstract typedef of [<code>Cestino</code>](#module_Cestino)  

| Param | Type |
| --- | --- |
| position | [<code>CartPosition</code>](#CartPosition) | 


* * *

<a name="module_Cestino..changePositionCallback"></a>

### *Cestino~changePositionCallback : <code>function</code>*
Callback that will be fired, if registered and a product-position in cart has been
changed.

**Kind**: inner abstract typedef of [<code>Cestino</code>](#module_Cestino)  

| Param | Type |
| --- | --- |
| position | [<code>CartPosition</code>](#CartPosition) | 


* * *

<a name="module_Cestino/PriceFormatter"></a>

## Cestino/PriceFormatter
Formatting integers to decimal currency representation.

**Requires**: [<code>Cestino/Util</code>](#module_Cestino/Util)  

* * *

<a name="module_Cestino/PriceFormatter.create"></a>

### Cestino/PriceFormatter.create(decimalSeperator, thousandsSeperator, decimalCount) ⇒ [<code>PriceFormatter</code>](#PriceFormatter)
Creates an object to convert integer price to decimal price (e. g. cents to dollar/euro).

**Kind**: static method of [<code>Cestino/PriceFormatter</code>](#module_Cestino/PriceFormatter)  

| Param | Type |
| --- | --- |
| decimalSeperator | <code>String</code> | 
| thousandsSeperator | <code>String</code> | 
| decimalCount | <code>Number</code> | 


* * *

<a name="module_Cestino/Util"></a>

## Cestino/Util
Utilities used to check and modify basic data types.


* [Cestino/Util](#module_Cestino/Util)
    * [.isInt(n)](#module_Cestino/Util.isInt) ⇒ <code>Boolean</code>
    * [.isEmpty(val)](#module_Cestino/Util.isEmpty) ⇒ <code>Boolean</code>
    * [.lpad(str, width, padStr)](#module_Cestino/Util.lpad) ⇒ <code>String</code>


* * *

<a name="module_Cestino/Util.isInt"></a>

### Cestino/Util.isInt(n) ⇒ <code>Boolean</code>
Is passed data of type Integer?

**Kind**: static method of [<code>Cestino/Util</code>](#module_Cestino/Util)  
**Access**: public  

| Param | Type |
| --- | --- |
| n | <code>\*</code> | 


* * *

<a name="module_Cestino/Util.isEmpty"></a>

### Cestino/Util.isEmpty(val) ⇒ <code>Boolean</code>
Is passed data empty?

**Kind**: static method of [<code>Cestino/Util</code>](#module_Cestino/Util)  
**Access**: public  

| Param | Type |
| --- | --- |
| val | <code>\*</code> | 


* * *

<a name="module_Cestino/Util.lpad"></a>

### Cestino/Util.lpad(str, width, padStr) ⇒ <code>String</code>
Pad a string on left side to a certain length with another string.

**Kind**: static method of [<code>Cestino/Util</code>](#module_Cestino/Util)  
**Access**: public  

| Param | Type |
| --- | --- |
| str | <code>String</code> | 
| width | <code>Integer</code> | 
| padStr | <code>String</code> | 


* * *

<a name="BasicCartService"></a>

## BasicCartService ℗
**Kind**: global class  
**Access**: private  

* [BasicCartService](#BasicCartService) ℗
    * [new BasicCartService(options)](#new_BasicCartService_new)
    * [.options](#BasicCartService+options) : <code>Object</code>
    * [.setProductDataToCart(oCart)](#BasicCartService+setProductDataToCart) ⇒ <code>Promise</code>


* * *

<a name="new_BasicCartService_new"></a>

### new BasicCartService(options)
Service used to fetch and put master data of products into the model.


| Param | Type |
| --- | --- |
| options | <code>Object</code> | 


* * *

<a name="BasicCartService+options"></a>

### basicCartService.options : <code>Object</code>
**Kind**: instance property of [<code>BasicCartService</code>](#BasicCartService)  

* * *

<a name="BasicCartService+setProductDataToCart"></a>

### basicCartService.setProductDataToCart(oCart) ⇒ <code>Promise</code>
Updates the cart with actual valid information about products.

**Kind**: instance method of [<code>BasicCartService</code>](#BasicCartService)  
**Access**: public  

| Param | Type |
| --- | --- |
| oCart | [<code>Cart</code>](#Cart) | 


* * *

<a name="Cart"></a>

## Cart ℗
**Kind**: global class  
**Access**: private  

* [Cart](#Cart) ℗
    * [new Cart(oService)](#new_Cart_new)
    * [.positionId](#Cart+positionId) : <code>Integer</code>
    * [.oCartService](#Cart+oCartService) : <code>Object</code>
    * [.positions](#Cart+positions) : [<code>Array.&lt;CartPosition&gt;</code>](#CartPosition)
    * [. shippingGroups](#Cart+ shippingGroups) : <code>Object</code> ℗
    * [.listener](#Cart+listener) : <code>Object</code>
    * [.walk(fnCallback)](#Cart+walk) ⇒ [<code>Cart</code>](#Cart)
    * [.toJSON()](#Cart+toJSON) ⇒ <code>String</code>
    * [.fromJSON(sJSON)](#Cart+fromJSON) ⇒ [<code>Cart</code>](#Cart)
    * [.add(oProduct, oQuantity, [oShippingGroup], [aProductFeatures])](#Cart+add) ⇒ <code>String</code>
    * [.on(kind, fnListener)](#Cart+on) ⇒ [<code>Cart</code>](#Cart)
    * [.off(kind, fnListener)](#Cart+off) ⇒ [<code>Cart</code>](#Cart)
    * [.getShippingGroups()](#Cart+getShippingGroups) ⇒ <code>Array.&lt;String&gt;</code>
    * [.getShippingGroupByName(sShippingGroup)](#Cart+getShippingGroupByName) ⇒ <code>false</code> \| [<code>ShippingGroup</code>](#ShippingGroup)
    * [.getPositionsOfGroup(sShippingGroup)](#Cart+getPositionsOfGroup) ⇒ [<code>Array.&lt;CartPosition&gt;</code>](#CartPosition)
    * [.calculateGroup(sShippingGroup, includeShippingGroupCost)](#Cart+calculateGroup) ⇒ <code>Integer</code>
    * [.calculate(includeShippingGroupCost)](#Cart+calculate) ⇒ <code>Integer</code>
    * [.deletePosition(sIdCartPosition)](#Cart+deletePosition) ⇒ [<code>CartPosition</code>](#CartPosition)
    * [.getPositionById(sIdCartPosition)](#Cart+getPositionById) ⇒ [<code>CartPosition</code>](#CartPosition)
    * [.replaceQuantity(oQuantity)](#Cart+replaceQuantity) ⇒ [<code>CartPosition</code>](#CartPosition)
    * [.incrementAmount(amount)](#Cart+incrementAmount) ⇒ [<code>CartPosition</code>](#CartPosition)
    * [.decrementAmount(amount)](#Cart+decrementAmount) ⇒ [<code>CartPosition</code>](#CartPosition)


* * *

<a name="new_Cart_new"></a>

### new Cart(oService)
Class to manage a shopping cart. The cart only supports product-positions
separated by shipping-groups.
All prices were handled without tax; Extend the model to consider tax
calculation.
You have to implement costs of payment on your own.


| Param | Type |
| --- | --- |
| oService | <code>Object</code> | 


* * *

<a name="Cart+positionId"></a>

### cart.positionId : <code>Integer</code>
**Kind**: instance property of [<code>Cart</code>](#Cart)  

* * *

<a name="Cart+oCartService"></a>

### cart.oCartService : <code>Object</code>
**Kind**: instance property of [<code>Cart</code>](#Cart)  

* * *

<a name="Cart+positions"></a>

### cart.positions : [<code>Array.&lt;CartPosition&gt;</code>](#CartPosition)
**Kind**: instance property of [<code>Cart</code>](#Cart)  

* * *

<a name="Cart+ shippingGroups"></a>

### cart. shippingGroups : <code>Object</code> ℗
**Kind**: instance property of [<code>Cart</code>](#Cart)  
**Access**: private  

* * *

<a name="Cart+listener"></a>

### cart.listener : <code>Object</code>
**Kind**: instance property of [<code>Cart</code>](#Cart)  

* * *

<a name="Cart+walk"></a>

### cart.walk(fnCallback) ⇒ [<code>Cart</code>](#Cart)
Walks through all positions of the cart, calls passed function and puts position and group to
it.

**Kind**: instance method of [<code>Cart</code>](#Cart)  
**Access**: public  

| Param | Type |
| --- | --- |
| fnCallback | <code>function</code> | 


* * *

<a name="Cart+toJSON"></a>

### cart.toJSON() ⇒ <code>String</code>
Returns a json-representation of the cart; Only necessary information will be transported to
the json-string.

**Kind**: instance method of [<code>Cart</code>](#Cart)  
**Access**: public  

* * *

<a name="Cart+fromJSON"></a>

### cart.fromJSON(sJSON) ⇒ [<code>Cart</code>](#Cart)
Build the cart from JSON

**Kind**: instance method of [<code>Cart</code>](#Cart)  
**Emits**: [<code>load</code>](#module_Cestino..event_load)  
**Access**: public  

| Param | Type |
| --- | --- |
| sJSON | <code>String</code> | 


* * *

<a name="Cart+add"></a>

### cart.add(oProduct, oQuantity, [oShippingGroup], [aProductFeatures]) ⇒ <code>String</code>
Creates a position in the cart

**Kind**: instance method of [<code>Cart</code>](#Cart)  
**Returns**: <code>String</code> - Id of generated Position  
**Emits**: [<code>add</code>](#module_Cestino..event_add)  
**Access**: public  

| Param | Type | Default |
| --- | --- | --- |
| oProduct | [<code>Product</code>](#Product) |  | 
| oQuantity | [<code>ProductQuantity</code>](#ProductQuantity) \| <code>Integer</code> |  | 
| [oShippingGroup] | [<code>ShippingGroup</code>](#ShippingGroup) \| <code>String</code> | <code>&quot;&quot;</code> | 
| [aProductFeatures] | [<code>Array.&lt;ProductFeature&gt;</code>](#ProductFeature) | <code>[]</code> | 


* * *

<a name="Cart+on"></a>

### cart.on(kind, fnListener) ⇒ [<code>Cart</code>](#Cart)
Adds a function that will be invoke when a specific event occurs.

**Kind**: instance method of [<code>Cart</code>](#Cart)  
**Returns**: [<code>Cart</code>](#Cart) - this-reference for method chaining ...  
**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| kind | <code>String</code> | "add" (product), "remove" (product), "change" (position) or "load" (cart) |
| fnListener | [<code>loadCallback</code>](#module_Cestino..loadCallback) \| [<code>addProductCallback</code>](#module_Cestino..addProductCallback) \| [<code>removeProductCallback</code>](#module_Cestino..removeProductCallback) \| [<code>changePositionCallback</code>](#module_Cestino..changePositionCallback) |  |


* * *

<a name="Cart+off"></a>

### cart.off(kind, fnListener) ⇒ [<code>Cart</code>](#Cart)
Removes a function that will be invoke on specific action.

**Kind**: instance method of [<code>Cart</code>](#Cart)  
**Returns**: [<code>Cart</code>](#Cart) - this-reference for method chaining ...  
**Access**: public  

| Param | Type |
| --- | --- |
| kind | <code>string</code> | 
| fnListener | [<code>loadCallback</code>](#module_Cestino..loadCallback) \| [<code>addProductCallback</code>](#module_Cestino..addProductCallback) \| [<code>removeProductCallback</code>](#module_Cestino..removeProductCallback) \| [<code>changePositionCallback</code>](#module_Cestino..changePositionCallback) | 


* * *

<a name="Cart+getShippingGroups"></a>

### cart.getShippingGroups() ⇒ <code>Array.&lt;String&gt;</code>
Get all defined groups.

**Kind**: instance method of [<code>Cart</code>](#Cart)  
**Access**: public  

* * *

<a name="Cart+getShippingGroupByName"></a>

### cart.getShippingGroupByName(sShippingGroup) ⇒ <code>false</code> \| [<code>ShippingGroup</code>](#ShippingGroup)
Returns a shipping-group by name.

**Kind**: instance method of [<code>Cart</code>](#Cart)  

| Param | Type |
| --- | --- |
| sShippingGroup | <code>String</code> \| [<code>ShippingGroup</code>](#ShippingGroup) | 


* * *

<a name="Cart+getPositionsOfGroup"></a>

### cart.getPositionsOfGroup(sShippingGroup) ⇒ [<code>Array.&lt;CartPosition&gt;</code>](#CartPosition)
Returns all positions of the pssed group.

**Kind**: instance method of [<code>Cart</code>](#Cart)  
**Access**: public  

| Param | Type |
| --- | --- |
| sShippingGroup | <code>String</code> \| [<code>ShippingGroup</code>](#ShippingGroup) | 


* * *

<a name="Cart+calculateGroup"></a>

### cart.calculateGroup(sShippingGroup, includeShippingGroupCost) ⇒ <code>Integer</code>
Calculates the subtotal of a shipping-group.

**Kind**: instance method of [<code>Cart</code>](#Cart)  
**Access**: public  

| Param | Type |
| --- | --- |
| sShippingGroup | <code>String</code> \| [<code>ShippingGroup</code>](#ShippingGroup) | 
| includeShippingGroupCost | <code>Boolean</code> | 


* * *

<a name="Cart+calculate"></a>

### cart.calculate(includeShippingGroupCost) ⇒ <code>Integer</code>
Calculates the total of the whole shopping-cart.

**Kind**: instance method of [<code>Cart</code>](#Cart)  
**Access**: public  

| Param | Type |
| --- | --- |
| includeShippingGroupCost | <code>Boolean</code> | 


* * *

<a name="Cart+deletePosition"></a>

### cart.deletePosition(sIdCartPosition) ⇒ [<code>CartPosition</code>](#CartPosition)
Delete a cart-position by id.

**Kind**: instance method of [<code>Cart</code>](#Cart)  
**Returns**: [<code>CartPosition</code>](#CartPosition) - sIdCartPosition The position that was removed  
**Emits**: [<code>remove</code>](#module_Cestino..event_remove)  
**Access**: public  

| Param | Type |
| --- | --- |
| sIdCartPosition | <code>String</code> | 


* * *

<a name="Cart+getPositionById"></a>

### cart.getPositionById(sIdCartPosition) ⇒ [<code>CartPosition</code>](#CartPosition)
Tries to get a position from given id.

**Kind**: instance method of [<code>Cart</code>](#Cart)  
**Access**: public  

| Param | Type |
| --- | --- |
| sIdCartPosition | <code>String</code> | 


* * *

<a name="Cart+replaceQuantity"></a>

### cart.replaceQuantity(oQuantity) ⇒ [<code>CartPosition</code>](#CartPosition)
Replacing the product quantity in cart position.

**Kind**: instance method of [<code>Cart</code>](#Cart)  
**Returns**: [<code>CartPosition</code>](#CartPosition) - this-reference for method chaining ...  
**Emits**: [<code>change</code>](#module_Cestino..event_change)  
**Access**: public  

| Param | Type |
| --- | --- |
| oQuantity | [<code>ProductQuantity</code>](#ProductQuantity) | 


* * *

<a name="Cart+incrementAmount"></a>

### cart.incrementAmount(amount) ⇒ [<code>CartPosition</code>](#CartPosition)
Incrementing amount of cart position.

**Kind**: instance method of [<code>Cart</code>](#Cart)  
**Emits**: [<code>change</code>](#module_Cestino..event_change)  
**Access**: public  

| Param | Type |
| --- | --- |
| amount | <code>Integer</code> | 


* * *

<a name="Cart+decrementAmount"></a>

### cart.decrementAmount(amount) ⇒ [<code>CartPosition</code>](#CartPosition)
Decrementing amount of cart position.

**Kind**: instance method of [<code>Cart</code>](#Cart)  
**Emits**: [<code>change</code>](#module_Cestino..event_change)  
**Access**: public  

| Param | Type |
| --- | --- |
| amount | <code>Integer</code> | 


* * *

<a name="CartPosition"></a>

## CartPosition ℗
**Kind**: global class  
**Access**: private  

* * *

<a name="new_CartPosition_new"></a>

### new CartPosition(sId, oProduct, aFeatures, oQuantity)
The cart reference will be injected on instancing separately.


| Param | Type |
| --- | --- |
| sId | <code>String</code> | 
| oProduct | [<code>Product</code>](#Product) | 
| aFeatures | [<code>Array.&lt;ProductFeature&gt;</code>](#ProductFeature) | 
| oQuantity | [<code>ProductQuantity</code>](#ProductQuantity) | 


* * *

<a name="Product"></a>

## Product ℗
**Kind**: global class  
**Access**: private  

* [Product](#Product) ℗
    * [new Cart.Product(id, title, price)](#new_Product_new)
    * [.getPrice()](#Product+getPrice) ⇒ <code>Integer</code>


* * *

<a name="new_Product_new"></a>

### new Cart.Product(id, title, price)
Class to describe a product that was add to cart.


| Param | Type |
| --- | --- |
| id | <code>String</code> | 
| title | <code>String</code> | 
| price | <code>Integer</code> | 


* * *

<a name="Product+getPrice"></a>

### product.getPrice() ⇒ <code>Integer</code>
Returns the price of the product. Overwrite this method to modify the cart calculation
to your needs (e. g. to add tax)

**Kind**: instance method of [<code>Product</code>](#Product)  

* * *

<a name="ProductQuantity"></a>

## ProductQuantity ℗
**Kind**: global class  
**Access**: private  

* [ProductQuantity](#ProductQuantity) ℗
    * [new Cart.ProductQuantity(amount, [dimX], [dimY], [dimZ])](#new_ProductQuantity_new)
    * [.getPrice()](#ProductQuantity+getPrice) ⇒ <code>Integer</code>


* * *

<a name="new_ProductQuantity_new"></a>

### new Cart.ProductQuantity(amount, [dimX], [dimY], [dimZ])
Class to represent the quantity structure of a product in a position. No limits or ranges
will be checked, you have to implement it by yourself!


| Param | Type |
| --- | --- |
| amount | <code>Integer</code> | 
| [dimX] | <code>Integer</code> | 
| [dimY] | <code>Integer</code> | 
| [dimZ] | <code>Integer</code> | 


* * *

<a name="ProductQuantity+getPrice"></a>

### productQuantity.getPrice() ⇒ <code>Integer</code>
Calculates the quantity factor for the product. Overwrite this method to modify the cart
calculation to your needs (e. g. to convert into another scale unit).

**Kind**: instance method of [<code>ProductQuantity</code>](#ProductQuantity)  

* * *

<a name="ProductFeature"></a>

## ProductFeature ℗
**Kind**: global class  
**Access**: private  

* [ProductFeature](#ProductFeature) ℗
    * [new Cart.ProductFeature(id, label, [price])](#new_ProductFeature_new)
    * [.getPrice()](#ProductFeature+getPrice) ⇒ <code>Integer</code>


* * *

<a name="new_ProductFeature_new"></a>

### new Cart.ProductFeature(id, label, [price])
Class to describe a selected feature of a product.


| Param | Type |
| --- | --- |
| id | <code>String</code> \| <code>Integer</code> | 
| label | <code>String</code> | 
| [price] | <code>Integer</code> | 


* * *

<a name="ProductFeature+getPrice"></a>

### productFeature.getPrice() ⇒ <code>Integer</code>
Returns the price of a feature selected to a product. Overwrite this method to modify
the cart calculation to your needs

**Kind**: instance method of [<code>ProductFeature</code>](#ProductFeature)  

* * *

<a name="ShippingGroup"></a>

## ShippingGroup ℗
**Kind**: global class  
**Access**: private  

* [ShippingGroup](#ShippingGroup) ℗
    * [new Cart.ShippingGroup([sName])](#new_ShippingGroup_new)
    * [. name](#ShippingGroup+ name) : <code>String</code> ℗
    * [. cart](#ShippingGroup+ cart) : [<code>Cart</code>](#Cart) ℗
    * [. price](#ShippingGroup+ price) : <code>Integer</code> ℗
    * [.calculate(includeShippingGroupCost)](#ShippingGroup+calculate) ⇒ <code>Integer</code>
    * [.setPrice(price)](#ShippingGroup+setPrice) ⇒ [<code>ShippingGroup</code>](#ShippingGroup)
    * [.getPrice()](#ShippingGroup+getPrice) ⇒ <code>Integer</code>
    * [.getName()](#ShippingGroup+getName) ⇒ <code>String</code>
    * [.getCart()](#ShippingGroup+getCart) ⇒ [<code>Cart</code>](#Cart)


* * *

<a name="new_ShippingGroup_new"></a>

### new Cart.ShippingGroup([sName])
Represents information about a shipping group


| Param | Type |
| --- | --- |
| [sName] | <code>String</code> | 


* * *

<a name="ShippingGroup+ name"></a>

### shippingGroup. name : <code>String</code> ℗
**Kind**: instance property of [<code>ShippingGroup</code>](#ShippingGroup)  
**Access**: private  

* * *

<a name="ShippingGroup+ cart"></a>

### shippingGroup. cart : [<code>Cart</code>](#Cart) ℗
**Kind**: instance property of [<code>ShippingGroup</code>](#ShippingGroup)  
**Access**: private  

* * *

<a name="ShippingGroup+ price"></a>

### shippingGroup. price : <code>Integer</code> ℗
**Kind**: instance property of [<code>ShippingGroup</code>](#ShippingGroup)  
**Access**: private  

* * *

<a name="ShippingGroup+calculate"></a>

### shippingGroup.calculate(includeShippingGroupCost) ⇒ <code>Integer</code>
Returns the cost for the whole Shipping group

**Kind**: instance method of [<code>ShippingGroup</code>](#ShippingGroup)  

| Param | Type |
| --- | --- |
| includeShippingGroupCost | <code>Boolean</code> | 


* * *

<a name="ShippingGroup+setPrice"></a>

### shippingGroup.setPrice(price) ⇒ [<code>ShippingGroup</code>](#ShippingGroup)
Sets the cost for shipping of a shipping group.

**Kind**: instance method of [<code>ShippingGroup</code>](#ShippingGroup)  

| Param | Type |
| --- | --- |
| price | <code>Integer</code> | 


* * *

<a name="ShippingGroup+getPrice"></a>

### shippingGroup.getPrice() ⇒ <code>Integer</code>
Returns the shipping cost for the group. Overwrite this method to add cost for shipping of a
shipping group. You can access the current cart through method-call "this.getCart()".

**Kind**: instance method of [<code>ShippingGroup</code>](#ShippingGroup)  

* * *

<a name="ShippingGroup+getName"></a>

### shippingGroup.getName() ⇒ <code>String</code>
Returns the name of this shipping group.

**Kind**: instance method of [<code>ShippingGroup</code>](#ShippingGroup)  

* * *

<a name="ShippingGroup+getCart"></a>

### shippingGroup.getCart() ⇒ [<code>Cart</code>](#Cart)
Returns the cart this shipping group belongs to.

**Kind**: instance method of [<code>ShippingGroup</code>](#ShippingGroup)  

* * *

<a name="PriceFormatter"></a>

## PriceFormatter ℗
**Kind**: global class  
**Access**: private  

* [PriceFormatter](#PriceFormatter) ℗
    * [new PriceFormatter(decimalSeperator, thousandsSeperator, decimalCount)](#new_PriceFormatter_new)
    * _instance_
        * [.decimalCount](#PriceFormatter+decimalCount) : <code>Integer</code>
        * [.thousandsSeperator](#PriceFormatter+thousandsSeperator) : <code>String</code>
        * [.decimalSeperator](#PriceFormatter+decimalSeperator) : <code>String</code>
    * _static_
        * [.format(int)](#PriceFormatter.format) ⇒ <code>String</code> ℗


* * *

<a name="new_PriceFormatter_new"></a>

### new PriceFormatter(decimalSeperator, thousandsSeperator, decimalCount)
Creates an object to convert integer price to decimal price (e. g. cents to dollar/euro).


| Param | Type |
| --- | --- |
| decimalSeperator | <code>String</code> | 
| thousandsSeperator | <code>String</code> | 
| decimalCount | <code>Integer</code> | 


* * *

<a name="PriceFormatter+decimalCount"></a>

### priceFormatter.decimalCount : <code>Integer</code>
**Kind**: instance property of [<code>PriceFormatter</code>](#PriceFormatter)  

* * *

<a name="PriceFormatter+thousandsSeperator"></a>

### priceFormatter.thousandsSeperator : <code>String</code>
**Kind**: instance property of [<code>PriceFormatter</code>](#PriceFormatter)  

* * *

<a name="PriceFormatter+decimalSeperator"></a>

### priceFormatter.decimalSeperator : <code>String</code>
**Kind**: instance property of [<code>PriceFormatter</code>](#PriceFormatter)  

* * *

<a name="PriceFormatter.format"></a>

### PriceFormatter.format(int) ⇒ <code>String</code> ℗
Converts the passed integer value into configured format.

**Kind**: static method of [<code>PriceFormatter</code>](#PriceFormatter)  
**Access**: private  

| Param | Type |
| --- | --- |
| int | <code>Integer</code> | 


* * *

