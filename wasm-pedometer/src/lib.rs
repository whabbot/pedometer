use rusty_pedometer::filter_data;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn process_data(data: String) -> Vec<f64> {
    let result = filter_data(data);
    println!("Result: {:?}", result);
    result
}
