import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  @IsOptional()
  year: number;

  @IsString()
  @IsOptional()
  artistId: string | null = null;
}
