import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';
import { z } from 'zod';

// Query validation schema
const QuerySchema = z.object({
  concern: z.string().optional(),
  category: z.string().optional(),
  search: z.string().optional(),
  sortBy: z.enum(['featured', 'price-asc', 'price-desc', 'rating']).optional().default('featured'),
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(12),
});

/**
 * GET /api/products
 * Fetch products with filtering, searching, and sorting
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const queryData = {
      concern: searchParams.get('concern') || undefined,
      category: searchParams.get('category') || undefined,
      search: searchParams.get('search') || undefined,
      sortBy: searchParams.get('sortBy') || 'featured',
      page: searchParams.get('page') || '1',
      limit: searchParams.get('limit') || '12',
    };

    const validatedQuery = QuerySchema.parse(queryData);

    // Build filter object
    const filter: Record<string, any> = {};

    if (validatedQuery.concern && validatedQuery.concern !== 'All') {
      filter.concern = validatedQuery.concern;
    }

    if (validatedQuery.category) {
      filter.category = validatedQuery.category;
    }

    if (validatedQuery.search) {
      filter.$or = [
        { name: { $regex: validatedQuery.search, $options: 'i' } },
        { description: { $regex: validatedQuery.search, $options: 'i' } },
        { tags: { $in: [new RegExp(validatedQuery.search, 'i')] } },
      ];
    }

    // Build sort object
    let sort: Record<string, 1 | -1> = { createdAt: -1 };

    switch (validatedQuery.sortBy) {
      case 'price-asc':
        sort = { price: 1 };
        break;
      case 'price-desc':
        sort = { price: -1 };
        break;
      case 'rating':
        sort = { rating: -1, reviews: -1 };
        break;
      case 'featured':
        sort = { isBestSeller: -1, isNew: -1, rating: -1 };
        break;
    }

    // Calculate pagination
    const page = validatedQuery.page;
    const limit = validatedQuery.limit;
    const skip = (page - 1) * limit;

    // Execute query
    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      Product.countDocuments(filter),
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json(
      {
        success: true,
        data: products,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNextPage,
          hasPrevPage,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Products API error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid query parameters',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch products',
      },
      { status: 500 }
    );
  }
}
