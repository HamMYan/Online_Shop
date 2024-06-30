import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService:UserService){}

    // async validateUser(username: string, pass: string){
    //     const user = await this.userService.findOne({username})
            //Here is error
    // }
}
