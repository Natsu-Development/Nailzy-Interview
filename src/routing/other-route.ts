import { Router } from "express";
import { OtherController } from "src/module/other";

const router = Router();

router.get("/", OtherController.handle_category_list);

// Sales Orders API
router.get("/reports/top-used-coupons", OtherController.report_top_coupon_optimized);
router.get("/reports/sales-taxes", OtherController.report_sales_taxes);
router.get("/reports/shipping-states", OtherController.report_shipping_states);

export const other_route = router;
