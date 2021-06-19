import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-fms-single-image',
  templateUrl: './fms-single-image.component.html',
  styleUrls: ['./fms-single-image.component.scss']
})
export class FmsSingleImageComponent implements OnInit {
  @ViewChild('file') file!: ElementRef;
  realFile!: File | null;
  imgSrc: string | ArrayBuffer;

  constructor() { 
    this.imgSrc = environment.image.fileSingleDefaulImageSrc;
  }

  ngOnInit(): void {

  }

  imageUploadClick(): void {
    // console.log(this.file.nativeElement.files);
    this.file.nativeElement.click();
  }

  fileChanged(event: Event): void {
    this.realFile = (event.target as any).files[0] as File;
    this.setPreviewImage(event);
  }

  setPreviewImage(event: Event): void {
    // 이미지 파일인지 검사 (생략)

    // FileReader 인스턴스 생성
    const reader = new FileReader()
    // 이미지가 로드가 된 경우
    reader.onload = e => {
      this.imgSrc = e.target?.result!;
    };
    // reader가 이미지 읽도록 하기
    reader.readAsDataURL((event.target as any).files[0]);
  }

  imageClear(): void {
    this.realFile = null;
    this.imgSrc = environment.image.fileSingleDefaulImageSrc;
  }

  getFile(): File | null | undefined {
    return this.realFile;
  }
}
