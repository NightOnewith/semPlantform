package net.wanho.util;

import com.octo.captcha.service.image.DefaultManageableImageCaptchaService;

public class EcManageableImageCaptchaService extends DefaultManageableImageCaptchaService {

    public EcManageableImageCaptchaService(com.octo.captcha.service.captchastore.CaptchaStore captchaStore, com.octo
            .captcha.engine.CaptchaEngine captchaEngine, int minGuarantedStorageDelayInSeconds, int
                                                   maxCaptchaStoreSize, int captchaStoreLoadBeforeGarbageCollection) {
        super(captchaStore, captchaEngine, minGuarantedStorageDelayInSeconds, maxCaptchaStoreSize,
                captchaStoreLoadBeforeGarbageCollection);
    }

    public boolean hasCapcha(String id, String userCaptchaResponse) {
        return store.getCaptcha(id).validateResponse(userCaptchaResponse);
    }
}
