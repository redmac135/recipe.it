from .groceryitems import router as groceryitems_router
from .kitchenitems import router as kitchenitems_router
from .recipes import router as recipes_router
from .recipts import router as recipts_router


class Routes:
    def __init__(self, app):
        app.include_router(recipes_router, prefix="/recipes", tags=["Recipes"])
        app.include_router(
            kitchenitems_router, prefix="/kitchenitems", tags=["KitchenItems"]
        )
        app.include_router(
            groceryitems_router, prefix="/groceryitems", tags=["GroceryItems"]
        )
        app.include_router(recipts_router, prefix="/receipts", tags=["Recipts"])
