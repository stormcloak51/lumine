import { MediaService } from './media.service';
export declare class MediaController {
    private readonly mediaService;
    constructor(mediaService: MediaService);
    postDraft(files: Array<Express.Multer.File>): void;
}
