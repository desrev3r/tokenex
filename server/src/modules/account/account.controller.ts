import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiParam, ApiTags } from '@nestjs/swagger';

import { WalletService } from '@modules/wallet';

import { AccountService } from './account.service';
import { CreateAccountDto, UpdateAccountDto } from './account.dto';

@ApiTags('Account')
@Controller('/accounts')
export class AccountController {
  constructor(
    private accountService: AccountService,
    private walletService: WalletService,
  ) {}

  @Get()
  async getAll() {
    const result = await this.accountService.find({});
    return { result };
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'integer',
  })
  async getByKey(@Param() params) {
    const { id } = params.id;

    const result = await this.accountService.findOne({ where: { id } });
    if (!result) return { error: `Account #${id} Not Found!` };

    return { result };
  }

  @Post()
  async create(@Res() res: Response, @Body() data: CreateAccountDto) {
    const account = await this.accountService.create(data);
    if (!account)
      return res.status(400).json({ error: `Account Not Created!` });

    return res.status(201).json({ result: account });
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'integer',
  })
  async update(@Param() params, @Body() updateDto: UpdateAccountDto) {
    const { id } = params.id;

    // Checking Account
    const existedAccount = await this.accountService.findOne({ where: { id } });
    if (!existedAccount) return { error: `Account #${id} Not Found!` };

    // Updating Account
    const result = await this.accountService.update({
      where: { id },
      data: updateDto,
    });
    return { result };
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'integer',
  })
  async delete(@Param() params) {
    const { id } = params.id;

    // Checking Account
    const existedAccount = await this.accountService.findOne({ where: { id } });
    if (!existedAccount) return { error: `Account #${id} Not Found!` };

    // Deleting Account
    const result = await this.accountService.delete({ where: { id } });
    return { result };
  }
}
