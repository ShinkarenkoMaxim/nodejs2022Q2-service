import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  artistId: string | null = null;

  @IsString()
  @IsOptional()
  albumId: string | null = null;

  @IsNumber()
  @IsOptional()
  duration: number;
}
