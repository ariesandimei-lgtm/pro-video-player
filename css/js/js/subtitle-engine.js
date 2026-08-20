class SubtitleEngine {
    constructor(videoElement, subtitleElement) {
        this.video = videoElement;
        this.subtitleElement = subtitleElement;

        this.segments = [];
        this.enabled = true;

        this.delay = 0;

        this.currentSegmentId = null;
        this.animationFrameId = null;
    }

    async load(url) {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(
                    `Gagal memuat subtitle: ${response.status}`
                );
            }

            const data = await response.json();

            if (!Array.isArray(data.segments)) {
                throw new Error(
                    "Format subtitle tidak valid."
                );
            }

            this.segments = data.segments;

            console.log(
                `Subtitle berhasil dimuat: ${this.segments.length} segmen`
            );

            return true;

        } catch (error) {
            console.error(
                "Subtitle Engine Error:",
                error
            );

            this.subtitleElement.textContent =
                "Subtitle gagal dimuat.";

            return false;
        }
    }

    getAdjustedTime() {
        return this.video.currentTime + this.delay;
    }

    findSegment(time) {
        return this.segments.find(segment => {
            return (
                time >= segment.start &&
                time < segment.end
            );
        });
    }

    update() {
        if (!this.enabled) {
            this.clearSubtitle();
            return;
        }

        const currentTime = this.getAdjustedTime();

        const segment =
            this.findSegment(currentTime);

        if (segment) {
            if (
                this.currentSegmentId !==
                segment.id
            ) {
                this.showSubtitle(segment);
            }
        } else {
            this.clearSubtitle();
        }
    }

    showSubtitle(segment) {
        this.currentSegmentId =
            segment.id;

        this.subtitleElement.textContent =
            segment.text;

        this.subtitleElement.classList.add(
            "visible"
        );
    }

    clearSubtitle() {
        if (
            this.currentSegmentId !== null ||
            this.subtitleElement.textContent
        ) {
            this.currentSegmentId = null;

            this.subtitleElement.textContent =
                "";

            this.subtitleElement.classList.remove(
                "visible"
            );
        }
    }

    start() {
        const sync = () => {
            this.update();

            this.animationFrameId =
                requestAnimationFrame(sync);
        };

        sync();
    }

    stop() {
        if (this.animationFrameId) {
            cancelAnimationFrame(
                this.animationFrameId
            );

            this.animationFrameId = null;
        }
    }

    setEnabled(enabled) {
        this.enabled = enabled;

        if (!enabled) {
            this.clearSubtitle();
        } else {
            this.update();
        }
    }

    setDelay(milliseconds) {
        this.delay =
            milliseconds / 1000;

        this.update();
    }

    destroy() {
        this.stop();
        this.segments = [];
        this.clearSubtitle();
    }
}
