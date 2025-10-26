import { RatingEligibility } from '@Core/enums/rating-eligibility.enum';
import { RatingActions } from '@Core/enums/rating-actions.enum';

export interface ActionEligibilityStatus {
    /**
    *   Primary Add eligibility. Not nullable.
    *   When AddType is specified in the owning object, this applies to only that type.
    */
    [RatingActions.add]: RatingEligibility;

    /**
    *   Eligibility for any other type besides the AddType specified in the owning object;
    *   if that field is null, this will be null.
    */
   [RatingActions.addAllOther]: RatingEligibility;

    /**
    *   Eligibility for Modify transactions. Not nullable.
    */
   [RatingActions.modify]: RatingEligibility;

    /**
    *   Eligibility for Remove transactions. Not nullable.
    */
   [RatingActions.remove]: RatingEligibility;
}