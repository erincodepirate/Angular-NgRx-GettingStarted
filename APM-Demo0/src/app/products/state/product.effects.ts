import { Injectable } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { ProductService } from "../product.service";
import * as ProductActions from './product.actions';
import { catchError, map, mergeMap } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()

export class ProductEffects {
    loadProducts$: any;

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
        }
}