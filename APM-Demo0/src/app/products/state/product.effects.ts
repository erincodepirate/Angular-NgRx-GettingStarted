import { Injectable } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { ProductService } from "../product.service";
import * as ProductActions from './product.actions';
import { catchError, concatMap, map, mergeMap } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()

export class ProductEffects {
    loadProducts$: any;
    updateProduct$: any;
    createProduct$: any;
    deleteProduct$: any;

    constructor(private actions$: Actions,
                private productService: ProductService) {
            this.loadProducts$ = createEffect(() => {
                return this.actions$.pipe(
                    ofType(ProductActions.loadProducts),
                    mergeMap(() => 
                        this.productService.getProducts().pipe(
                            map(products => 
                                ProductActions.loadProductsSuccess({products})),
                            catchError(error => 
                                of(ProductActions.loadProductsFailure({error})))
                            )
                        ),
                       );
                }); 
            this.updateProduct$ = createEffect(() => {
                return this.actions$.pipe(
                    ofType(ProductActions.updateProduct),
                    concatMap(action => 
                        this.productService.updateProduct(action.product).pipe(
                            map(product => 
                                ProductActions.updateProductSuccess({product})),
                            catchError(error => 
                                of(ProductActions.updateProductFailure({error})))
                        )
                    )
                );
            });
            this.createProduct$ = createEffect(() => {
                return this.actions$.pipe(
                    ofType(ProductActions.createProduct),
                    concatMap(action => 
                        this.productService.createProduct(action.product).pipe(
                            map(product => 
                                ProductActions.createProductSuccess({product})),
                            catchError(error => 
                                of(ProductActions.createProductFailure({error})))
                        )
                    )
                );
            });
            this.deleteProduct$ = createEffect(() => {
                return this.actions$.pipe(
                    ofType(ProductActions.deleteProduct),
                    concatMap(action => 
                        this.productService.deleteProduct(action.product.id).pipe(
                            map(() => 
                                ProductActions.deleteProductSuccess({product:action.product})),
                            catchError(error => 
                                of(ProductActions.deleteProductFailure({error})))
                        )
                    )
                );
            });
        }
}