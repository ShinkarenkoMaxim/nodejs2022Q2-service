import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateArtistDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsOptional()
  grammy: boolean;
}
