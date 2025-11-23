import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

type GameType = 'all' | 'roblox' | 'dota2';

interface Product {
  id: number;
  title: string;
  game: 'roblox' | 'dota2';
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  seller: string;
  inStock: boolean;
}

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Robux Pack 10,000',
    game: 'roblox',
    price: 999,
    originalPrice: 1299,
    image: 'https://cdn.poehali.dev/projects/addb430d-8f1d-4eca-9a10-b185ef756d76/files/8390a5d1-c8f1-447c-aaac-cb02838f6a7a.jpg',
    rating: 4.9,
    seller: 'ProGamer',
    inStock: true
  },
  {
    id: 2,
    title: 'Premium Account Level 80',
    game: 'roblox',
    price: 1599,
    image: 'https://cdn.poehali.dev/projects/addb430d-8f1d-4eca-9a10-b185ef756d76/files/6ccebbb6-9e1a-4974-9458-9c643c972a60.jpg',
    rating: 4.8,
    seller: 'GameMaster',
    inStock: true
  },
  {
    id: 3,
    title: 'Arcana Bundle Set',
    game: 'dota2',
    price: 2499,
    originalPrice: 2999,
    image: 'https://cdn.poehali.dev/projects/addb430d-8f1d-4eca-9a10-b185ef756d76/files/06969287-0c0a-43fe-a0c5-47e062143e7d.jpg',
    rating: 5.0,
    seller: 'DotaKing',
    inStock: true
  },
  {
    id: 4,
    title: 'Robux Pack 5,000',
    game: 'roblox',
    price: 499,
    image: 'https://cdn.poehali.dev/projects/addb430d-8f1d-4eca-9a10-b185ef756d76/files/8390a5d1-c8f1-447c-aaac-cb02838f6a7a.jpg',
    rating: 4.7,
    seller: 'ProGamer',
    inStock: true
  },
  {
    id: 5,
    title: 'Immortal Treasures x10',
    game: 'dota2',
    price: 899,
    image: 'https://cdn.poehali.dev/projects/addb430d-8f1d-4eca-9a10-b185ef756d76/files/06969287-0c0a-43fe-a0c5-47e062143e7d.jpg',
    rating: 4.6,
    seller: 'TreasureHub',
    inStock: false
  },
  {
    id: 6,
    title: 'VIP Account + Items',
    game: 'roblox',
    price: 1999,
    originalPrice: 2499,
    image: 'https://cdn.poehali.dev/projects/addb430d-8f1d-4eca-9a10-b185ef756d76/files/6ccebbb6-9e1a-4974-9458-9c643c972a60.jpg',
    rating: 4.9,
    seller: 'EliteShop',
    inStock: true
  }
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState<GameType>('all');
  const [showSellForm, setShowSellForm] = useState(false);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    game: 'roblox',
    inStock: true
  });

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGame = selectedGame === 'all' || product.game === selectedGame;
    return matchesSearch && matchesGame;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center animate-glow">
                <Icon name="Gamepad2" size={24} className="text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                GameMarket
              </h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Button variant="ghost" className="hover:text-primary transition-colors">
                Главная
              </Button>
              <Button variant="ghost" className="hover:text-primary transition-colors">
                Каталог
              </Button>
              <Button 
                variant="ghost" 
                className="hover:text-primary transition-colors"
                onClick={() => setShowSellForm(true)}
              >
                Продать
              </Button>
            </nav>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="hidden sm:flex border-primary/50 hover:bg-primary/10">
                <Icon name="LogIn" size={18} className="mr-2" />
                Войти
              </Button>
              <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                <Icon name="UserPlus" size={18} className="mr-2" />
                <span className="hidden sm:inline">Регистрация</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 text-sm px-4 py-1">
              Комиссия всего 3%
            </Badge>
            <h2 className="text-4xl sm:text-6xl font-heading font-bold mb-6 leading-tight">
              Покупай игровые предметы
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                выгодно и безопасно
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Маркетплейс для геймеров с самой низкой комиссией. Roblox, Dota 2 и многое другое.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all hover:scale-105">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name="Shield" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold mb-1">Безопасно</h3>
                  <p className="text-sm text-muted-foreground">Гарантия возврата средств</p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-secondary/50 transition-all hover:scale-105">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name="Zap" size={24} className="text-secondary" />
                  </div>
                  <h3 className="font-heading font-semibold mb-1">Быстро</h3>
                  <p className="text-sm text-muted-foreground">Моментальная доставка</p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-accent/50 transition-all hover:scale-105">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon name="TrendingDown" size={24} className="text-accent" />
                  </div>
                  <h3 className="font-heading font-semibold mb-1">Выгодно</h3>
                  <p className="text-sm text-muted-foreground">Комиссия всего 3%</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Поиск товаров..."
                className="pl-10 bg-background/50 border-border/50 focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedGame === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedGame('all')}
                className={selectedGame === 'all' ? 'bg-gradient-to-r from-primary to-secondary' : ''}
              >
                Все игры
              </Button>
              <Button
                variant={selectedGame === 'roblox' ? 'default' : 'outline'}
                onClick={() => setSelectedGame('roblox')}
                className={selectedGame === 'roblox' ? 'bg-gradient-to-r from-primary to-secondary' : ''}
              >
                🎮 Roblox
              </Button>
              <Button
                variant={selectedGame === 'dota2' ? 'default' : 'outline'}
                onClick={() => setSelectedGame('dota2')}
                className={selectedGame === 'dota2' ? 'bg-gradient-to-r from-primary to-secondary' : ''}
              >
                ⚔️ Dota 2
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all hover:scale-105 bg-card/50 backdrop-blur-sm animate-scale-in">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden aspect-video bg-muted">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      {product.originalPrice && (
                        <Badge className="bg-accent text-accent-foreground">
                          -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                        </Badge>
                      )}
                      {!product.inStock && (
                        <Badge variant="destructive">Нет в наличии</Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {product.game === 'roblox' ? '🎮 Roblox' : '⚔️ Dota 2'}
                    </Badge>
                    <div className="flex items-center gap-1 ml-auto">
                      <Icon name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                  </div>
                  <h3 className="font-heading font-semibold mb-1 line-clamp-2">{product.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
                    <Icon name="User" size={14} />
                    {product.seller}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-heading font-bold text-primary">{product.price}₽</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">{product.originalPrice}₽</span>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button 
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                    disabled={!product.inStock}
                  >
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    {product.inStock ? 'Купить' : 'Недоступно'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <Icon name="Package" size={64} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-heading font-semibold mb-2">Товары не найдены</h3>
              <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
            </div>
          )}
        </div>
      </section>

      <Dialog open={showSellForm} onOpenChange={setShowSellForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading">Выставить товар на продажу</DialogTitle>
            <DialogDescription>
              Заполните информацию о вашем товаре. После модерации он появится в каталоге.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Название товара *</Label>
              <Input
                id="title"
                placeholder="Например: Robux Pack 10,000"
                value={newProduct.title || ''}
                onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="game">Игра *</Label>
                <Select 
                  value={newProduct.game} 
                  onValueChange={(value: 'roblox' | 'dota2') => setNewProduct({ ...newProduct, game: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите игру" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="roblox">🎮 Roblox</SelectItem>
                    <SelectItem value="dota2">⚔️ Dota 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Цена (₽) *</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="999"
                  value={newProduct.price || ''}
                  onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Ссылка на изображение</Label>
              <Input
                id="image"
                placeholder="https://example.com/image.jpg"
                value={newProduct.image || ''}
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">Оставьте пустым для использования изображения по умолчанию</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="seller">Ваш никнейм *</Label>
              <Input
                id="seller"
                placeholder="ProGamer"
                value={newProduct.seller || ''}
                onChange={(e) => setNewProduct({ ...newProduct, seller: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSellForm(false)}>
              Отмена
            </Button>
            <Button 
              className="bg-gradient-to-r from-primary to-secondary"
              onClick={() => {
                if (!newProduct.title || !newProduct.price || !newProduct.seller) {
                  return;
                }
                
                const product: Product = {
                  id: products.length + 1,
                  title: newProduct.title,
                  game: newProduct.game || 'roblox',
                  price: newProduct.price,
                  image: newProduct.image || 'https://cdn.poehali.dev/projects/addb430d-8f1d-4eca-9a10-b185ef756d76/files/8390a5d1-c8f1-447c-aaac-cb02838f6a7a.jpg',
                  rating: 4.5,
                  seller: newProduct.seller,
                  inStock: true
                };
                
                setProducts([product, ...products]);
                setShowSellForm(false);
                setNewProduct({ game: 'roblox', inStock: true });
              }}
            >
              <Icon name="Plus" size={18} className="mr-2" />
              Выставить на продажу
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <footer className="border-t border-border/50 bg-card/30 py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Gamepad2" size={18} className="text-primary-foreground" />
                </div>
                <span className="text-lg font-heading font-bold">GameMarket</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Маркетплейс игровых предметов с минимальной комиссией
              </p>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold mb-4">Покупателям</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Как купить</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Гарантии</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold mb-4">Продавцам</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Как продать</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Комиссия</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Правила</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  support@gamemarket.com
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="MessageCircle" size={16} />
                  Онлайн-чат
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/50 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 GameMarket. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}