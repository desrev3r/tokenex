import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiParam, ApiTags } from '@nestjs/swagger';

import { CryptoWalletService } from './../crypto-wallet/crypto-wallet/crypto-wallet.service';

import { WalletService } from './wallet.service';
import { CreateWalletDto, UpdateWalletDto } from './wallet.dto';
import { ETHWalletService } from '../crypto-wallet/eth-wallet';
import { USDTWalletService } from '../crypto-wallet/usdt-wallet';

@ApiTags('Wallet')
@Controller('/wallets')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Get()
  async getAll(@Res() res: Response): Promise<any> {
    const result = await this.walletService.query({});
    return res.status(200).json({ result });
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'integer',
  })
  async getByKey(@Res() res: Response, @Param() params) {
    const id = Number(params.id);

    const result = await this.walletService.findOne({ id });
    if (!result) return res.status(400).json({ error: `Wallet Not Created!` });

    return res.status(200).json({ result });
  }

  @Post()
  async create(@Res() res: Response, @Body() createDto: CreateWalletDto) {
    const result = await this.walletService.create(createDto);
    if (!result) return res.status(400).json({ error: `Wallet Not Created!` });

    return res.status(201).json({ result });
  }

  @Put(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'integer',
  })
  async update(
    @Res() res: Response,
    @Param() params,
    @Body() updateDto: UpdateWalletDto,
  ) {
    const id = Number(params.id);

    // Checking Wallet
    const existedWallet = await this.walletService.findOne({ id });
    if (!existedWallet)
      return res.status(404).json({ error: 'Wallet Not Updated!' });

    // Updating Wallet
    const result = await this.walletService.update({ id }, updateDto);
    if (!result) return res.status(400).json({ error: 'Wallet Not Updated!' });

    return res.status(200).json({ result });
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    type: 'integer',
  })
  async delete(@Res() res: Response, @Param() params): Promise<any> {
    const id = Number(params.id);

    // Checking Wallet
    const existedWallet = await this.walletService.findOne({ id });
    if (!existedWallet)
      return res.status(404).json({ error: 'Wallet Not Updated!' });

    // Deleting Wallet
    const result = await this.walletService.delete({ id });
    if (!result) return res.status(400).json({ error: 'Wallet Not Updated!' });

    return res.status(200).json({ result });
  }
}