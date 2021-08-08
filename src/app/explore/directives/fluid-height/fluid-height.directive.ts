import {
    AfterViewInit, Directive, ElementRef, HostBinding, Input, OnDestroy, Renderer2, Inject
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, throttleTime } from 'rxjs/operators';

@Directive({
  selector: '[appFluidHeight]'
})
export class FluidHeightDirective implements AfterViewInit, OnDestroy {
    @Input() minHeight = 0;
    @Input('fluidHeight') topOffset = 0;
    @HostBinding('style.overflow-y') overflowY = 'auto';

    private domElement: HTMLElement;
    private resizeSub: Subscription;

    constructor(
        private renderer: Renderer2,
        private elementRef: ElementRef,
        @Inject('Window') private window: Window
    ) {
        this.domElement = this.elementRef.nativeElement as HTMLElement;

        this.resizeSub = fromEvent(this.window, 'resize')
            .pipe(throttleTime(500), debounceTime(500))
            .subscribe(() => this.setHeight());
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.setHeight();
        });
    }

    ngOnDestroy(): void{
        this.resizeSub.unsubscribe();
    }

    private setHeight(): void {
        const windowHeight = this.window.innerHeight;
        const topOffset = this.topOffset || this.calcTopOffset();
        let height = windowHeight - topOffset;

        if (this.minHeight && height < this.minHeight) {
            height = this.minHeight;
        }

        this.renderer.setStyle(this.domElement, 'height', `${height}px`);
    }

    private calcTopOffset(): number {
        try {
            const rect = this.domElement.getBoundingClientRect();
            const scrollTop = this.window.pageYOffset || this.window.document.documentElement.scrollTop;

            return rect.top + scrollTop;
        }
        catch (e) {
            return 0;
        }
    }
}
