"use client"
import { useEffect, useState } from "react"
import { ArrowLeft, Loader2 } from "lucide-react" // Removed unused Link icon
import Image from "next/image"
import { useParams, useRouter } from "next/navigation" // Added useRouter
import axios from "axios"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { formatCurrency, formatDate } from "@/lib/functions"
import { ProductProps } from "@/lib/types"

export default function ProductPage() {
    const { productId } = useParams()
    const router = useRouter() // Added for navigation
    
    const [product, setProduct] = useState<ProductProps | null>(null)
    const [loading, setIsLoading] = useState(true) // Fixed: initial true

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get('../api/product', {
                    params: { productId }
                })
                setProduct(response.data)
            }
            catch (error) {
                console.error("Error fetching product:", error)
                toast.error("Failed to load product. Please try again.")
                setProduct(null)
            }
            finally {
                setIsLoading(false)
            }
        }

        fetchProduct()
    }, [productId])

    // Handle all states in sequence
    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
                    <Button onClick={() => router.push("/products")}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Products
                    </Button>
                </div>
            </div>
        )
    }

    const { id, name, price, description, image_url, created_at } = product

    const imageUrl = image_url || "https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Button 
                variant="link" 
                className="text-muted-foreground pl-0 mb-4"
                onClick={() => router.push("/")}
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go back
            </Button>

            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl">{name}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <AspectRatio ratio={4 / 3}>
                                <Image
                                    src={imageUrl}
                                    alt={name}
                                    fill
                                    className="object-cover rounded-2xl"
                                    priority
                                />
                            </AspectRatio>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Price</h3>
                                <p className="text-2xl font-bold text-primary">
                                    {formatCurrency(price)}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Description</h3>
                                <p className="text-foreground">
                                    {description || "No description available"}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Product ID</h3>
                                <p className="font-mono text-sm">
                                    {id}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Created At</h3>
                                <p className="text-foreground">
                                    {formatDate(created_at)}
                                </p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}