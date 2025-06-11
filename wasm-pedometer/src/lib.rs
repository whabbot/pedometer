use rusty_pedometer::filter_data;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn process_data() -> Vec<f64> {
    let dummy_data = "1,1,1;2,2,2".to_string();
    let result = filter_data(dummy_data);
    println!("Result: {:?}", result);
    result
}
