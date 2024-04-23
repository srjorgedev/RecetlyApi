export type Recipes = {
    data: Datum[];
}

export type Datum = {
    recipe_id:                string;
    user_id:                  string;
    recipe_name:              string;
    recipe_tag:               number[];
    recipe_type:              number[];
    recipe_time:              string[];
    recipe_steps:             string[];
    recipe_ingredients:       string[];
    recipe_time_unit:         number[];
    recipe_ingredient_amount: number[];
    recipe_ingredient_unit:   number[];
    recipe_img:               string;
    created_at:               Date;
    recipe_description:       null | string;
}
