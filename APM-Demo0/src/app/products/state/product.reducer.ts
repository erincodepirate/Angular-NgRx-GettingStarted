import { createReducer, on,  createFeatureSelector, 
    createSelector } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { Product } from '../product';
import * as ProductActions from './product.actions';
export interface State extends AppState.State {
    products: ProductState;
}
export interface ProductState {
    showProductCode: boolean;
    currentProductId: number;
    currentProduct: Product
    products: Product[];
}

const initialState: ProductState = {
    showProductCode: true,
    currentProductId: null,
    currentProduct: null,
    products: []
};

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
    getProductFeatureState,
    state => state.showProductCode
);

/*export const getCurrentProductId = createSelector(
    getProductFeatureState,
    state => state.currentProductId
)

export const getCurrentProduct = createSelector(
    getProductFeatureState,
    getCurrentProductId,
    (state, currentProductId) => 
        state.products.find(p=> p.id === currentProductId)
)*/

export const getCurrentProduct = createSelector(
    getProductFeatureState,
    state => state.currentProduct
)

export const getProducts = createSelector(
    getProductFeatureState,
    state => state.products
)

export const productReducer = createReducer<ProductState>(
    initialState,
    on(ProductActions.toggleProductCode, (state):ProductState => {
        //console.log('original state: ' + JSON.stringify(state));
        return {
            ...state, 
            showProductCode: !state.showProductCode,
        };
    }),
    on(ProductActions.setCurrentProduct, (state, action): ProductState => {
        return {
            ...state,
            currentProduct: action.product
        }
    }),
    on(ProductActions.clearCurrentProduct, (state): ProductState => {
        return{
            ...state,
            currentProduct: null
        }
    }),
    on(ProductActions.initCurrentProduct, (state): ProductState => {
        return{
            ...state,
            currentProduct: {
                id: 0,
                productName: '',
                productCode: 'New',
                description: '',
                starRating: 0
            }
        }
    }),
    on(ProductActions.loadProducts, (state): ProductState => {
        return {
            ...state
        }
    }),
    on(ProductActions.loadProductsSuccess, (state): ProductState => {
        return {
            ...state,
            products: []
        }
    }),
    on(ProductActions.loadProductsFailure,(state): ProductState => {
        return {
            ...state,

        }
    })
);
