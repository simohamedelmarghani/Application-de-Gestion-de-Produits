package com.example.products;

import com.example.products.model.Product;
import com.example.products.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class ProductsApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProductsApplication.class, args);
    }

    @Bean
    CommandLineRunner seedProducts(ProductRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                repository.saveAll(List.of(
                        new Product(null, "Ordinateur Portable Pro 15\"", 1299.99, 12, "Informatique", true),
                        new Product(null, "Souris Ergonomique Sans Fil", 49.90, 45, "Accessoires", false),
                        new Product(null, "Clavier Mécanique RGB", 119.50, 18, "Accessoires", true),
                        new Product(null, "Écran 27\" 4K UHD", 389.00, 7, "Écrans", false),
                        new Product(null, "Casque Audio Bluetooth ANC", 199.00, 0, "Audio", false)
                ));
            }
        };
    }
}
