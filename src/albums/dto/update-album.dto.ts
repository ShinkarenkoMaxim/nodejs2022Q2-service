import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateAlbumDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  year: number;

  @IsString()
  @IsOptional()
  artistId: string | null;
}
