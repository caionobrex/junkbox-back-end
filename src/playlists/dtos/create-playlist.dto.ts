import { IsString, Length, IsOptional, IsInt, Min } from 'class-validator';

export class CreatePlayListDto {
  @IsString()
  @Length(2, 50)
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsInt()
  @Min(1)
  maxLength: number;
}
