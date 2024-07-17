import { ApiProperty } from '@nestjs/swagger';

export class PaymentDto {
    @ApiProperty()
    data: string []
    // {
    //     price_data: {
    //         productId: number,
    //         sizeId: number,
    //     }
    //     quantity: number
    // }[]
    @ApiProperty()
    currency: string

}

export class StripeData {
    price_data: {
        currency: string,
        product_data: {
            name: string,
        },
        unit_amount: number,
    }
    quantity: number;
}