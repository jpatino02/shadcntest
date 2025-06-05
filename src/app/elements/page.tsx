import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Edit, X } from "lucide-react";

export default function ElementsPreview() {
    return (
        <div className="container mx-auto space-y-2">
            <Card>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                    <CardAction>
                        <X />
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <p>Card Content</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>
            <div className="flex space-x-2">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline" className="outline-button">
                    Outline
                </Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
            </div>
            <div className="flex space-x-2">
                <Button size="icon">
                    <Edit />
                </Button>
                <Button variant="secondary" size="icon">
                    <Edit />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="outline-button"
                >
                    <Edit />
                </Button>
                <Button variant="ghost" size="icon">
                    <Edit />
                </Button>
                <Button variant="destructive" size="icon">
                    <Edit />
                </Button>
                <Button variant="link" size="icon">
                    <Edit />
                </Button>
            </div>
            <div>
                <ToggleGroup variant="outline" type="single">
                    <ToggleGroupItem value="a">A</ToggleGroupItem>
                    <ToggleGroupItem value="b">B</ToggleGroupItem>
                    <ToggleGroupItem value="c">C</ToggleGroupItem>
                </ToggleGroup>
            </div>
            <div>
                <Label htmlFor="email" className="mb-1">
                    Email
                </Label>
                <Input type="email" id="email" placeholder="Email" />
            </div>
            <div>
                <Tabs defaultValue="tab-1" className="items-center">
                    <TabsList className="h-auto rounded-none border-b bg-transparent p-0">
                        <TabsTrigger
                            value="tab-1"
                            className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                        >
                            Tab 1
                        </TabsTrigger>
                        <TabsTrigger
                            value="tab-2"
                            className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                        >
                            Tab 2
                        </TabsTrigger>
                        <TabsTrigger
                            value="tab-3"
                            className="data-[state=active]:after:bg-primary relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                        >
                            Tab 3
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="tab-1">
                        <p className="text-muted-foreground p-4 text-center text-xs">
                            Content for Tab 1
                        </p>
                    </TabsContent>
                    <TabsContent value="tab-2">
                        <p className="text-muted-foreground p-4 text-center text-xs">
                            Content for Tab 2
                        </p>
                    </TabsContent>
                    <TabsContent value="tab-3">
                        <p className="text-muted-foreground p-4 text-center text-xs">
                            Content for Tab 3
                        </p>
                    </TabsContent>
                </Tabs>
            </div>
            <div>
                <Badge>Badge</Badge>
                <Badge variant="secondary">Badge</Badge>
                <Badge variant="outline">Badge</Badge>
                <Badge variant="destructive">Badge</Badge>
                <Badge className="bg-warning">Badge</Badge>
                <Badge className="bg-info">Badge</Badge>
            </div>
        </div>
    );
}
