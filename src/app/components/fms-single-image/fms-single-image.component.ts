import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { YN } from 'src/app/types/yn.type';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-fms-single-image',
  templateUrl: './fms-single-image.component.html',
  styleUrls: ['./fms-single-image.component.scss']
})
export class FmsSingleImageComponent implements OnInit {
  @ViewChild('file') file!: ElementRef;
  realFile!: File | null;
  @Input() imgSrc: string | ArrayBuffer;
  @Output() onImageClick = new EventEmitter();
  @Output() onImageChanged = new EventEmitter();
  @Input() isDeleted: YN;

  constructor() { 
    this.realFile = null;
    this.imgSrc = environment.image.fileSingleDefaulImageSrc;
    this.isDeleted = 'N';
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
      this.onImageChanged.emit(this.imgSrc);
    };
    // reader가 이미지 읽도록 하기
    reader.readAsDataURL((event.target as any).files[0]);
    this.isDeleted = 'N';
  }

  imageClear(): void {
    this.realFile = null;
    this.imgSrc = environment.image.fileSingleDefaulImageSrc;
    this.isDeleted = 'Y';
  }

  getFile(): File | null | undefined {
    return this.realFile;
  }

  getIsDeleted(): YN {
    return this.isDeleted;
  }

  isChanged(): boolean {
    if (this.realFile !== null && this.realFile !== undefined) {
      return true;
    }

    if (this.realFile === null) {
      return true;
    }

    return false;
  }

  imageClick(event: MouseEvent): void {
    this.onImageClick.emit(event);
  }
}
